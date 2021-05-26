import "reflect-metadata";
import "dotenv/config";
import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
import session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import { genSchema } from "./utils/genSchema";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import connectRedis from "connect-redis";
// import * as RateLimit from "express-rate-limit";
// import * as RateLimitRedisStore from "rate-limit-redis";
import chalk from "chalk";
const RedisStore = connectRedis(session);
const SESSION_SECRET = "nabys";

/**
 * @function startServer -
 *
 * 1. we create a new server with GraqhQLServer, passing in two arguments: schema - the "model" or how we describe the data. context - an obj that is shared by all resolvers
 * 2.
 *
 */

export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      req: request,
    }),
  });
  // console.log(chalk.red.bold(server));
  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: "sess:",
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );
  const cors = {
    credentials: true,
    origin: process.env.FRONTEND_HOST as string,
  };
  server.express.get("/confirm/:id", confirmEmail);

  await createTypeOrmConnection();
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log(chalk.black.bgGreen("server is running on localhost: 4000"));
  return app;
};
