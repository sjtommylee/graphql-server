import { importSchema } from "graphql-import";
import * as path from "path";
import * as fs from "fs";
import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
import { GraphQLServer } from "graphql-yoga";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema, mergeSchema } from "graphql-tools";
// import { mergeSchemas } from "@graphql-tools/merge";
// import { makeExecutableSchema } from "graphql-tools";
const chalk = require("chalk");

export const startServer = async () => {
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));
  folders.forEach((folder) => {
    const { resolvers } = require(`./modules/${folder}/resolvers.ts`);
    const typeDefs = importSchema(
      path.join(__dirname, `./modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });
  const server = new GraphQLServer({});
  await createTypeOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log(chalk.bold.green("server is running on localhost: 4000"));
  return app;
};
