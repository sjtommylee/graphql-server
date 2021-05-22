import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
import { GraphQLServer } from "graphql-yoga";
import { genSchema } from "./utils/genSchema";
const chalk = require("chalk");

export const startServer = async () => {
  const server = new GraphQLServer({ schema: genSchema() });
  // console.log(chalk.red.bold(server));
  await createTypeOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log(chalk.bold.green("server is running on localhost: 4000"));
  return app;
};
