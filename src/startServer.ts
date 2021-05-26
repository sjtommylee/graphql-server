import "reflect-metadata";
import "dotenv/config";
import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
import session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import { genSchema } from "./utils/genSchema";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import connectRedis from "connect-redis";
import chalk from "chalk";
import { redisPrefix } from "./constants";
import { createTestConnection } from "./utils/tests/createTestConnection";
const RedisStore = connectRedis(session);
const SESSION_SECRET = "nabys";

/**
 * @function startServer -
 *
 */

// flushing the redis cache if the env is a test, just like how we are purging the db in a test.
export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }
  // creating a new graphql server, passing in the schema and the context.
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      req: request,
    }),
  });

  // we are creating a new session object by passing in a new redis store.
  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisPrefix,
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

  if (process.env.NODE_ENV === "test") {
    await createTestConnection(true);
  } else {
    await createTypeOrmConnection();
  }
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log(chalk.black.bgGreen("server is running on localhost: 4000"));
  return app;
};
