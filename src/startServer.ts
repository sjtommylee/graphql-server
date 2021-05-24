import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
import session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import { genSchema } from "./utils/genSchema";
// import Redis from "ioredis";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
const chalk = require("chalk");

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
    }),
  });
  // console.log(chalk.red.bold(server));
  server.express.use(
    session({
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
  server.express.get("/confirm/:id", confirmEmail);

  await createTypeOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log(chalk.bold.green("server is running on localhost: 4000"));
  return app;
};
