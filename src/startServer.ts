import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import * as path from "path";
import * as fs from "fs";
import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
import { GraphQLServer } from "graphql-yoga";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
// import { mergeSchemas } from "graphql-tools";
const chalk = require("chalk");

export const startServer = async () => {
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));
  const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
  const server = new GraphQLServer({ typeDefs, resolvers });
  await createTypeOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log(chalk.bold.green("server is running on localhost: 4000"));
  return app;
};
