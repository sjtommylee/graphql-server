import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import * as path from "path";
import * as fs from "fs";
import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";
import { GraphQLServer } from "graphql-yoga";
import { GraphQLSchema } from "graphql";
// import { makeExecutableSchema } from "graphql-tools";
const chalk = require("chalk");

/**
 * https://www.youtube.com/watch?v=4i3W6g_u1Nw&list=PLN3n1USn4xlky9uj6wOhfsPez7KZOqm2V&index=8
 * todos:
 * 1. figure out how to stich the schemas together.
 *
 *
 *
 */
export const startServer = async () => {
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));
  console.log(folders, schemas);
  // some kind of loop? goal is to look in the specified folders, grab the resolvers and the schemas,
  // merge the schemas, create a new server (line26) with the merged schema.
  const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
  const server = new GraphQLServer({ typeDefs, resolvers });
  await createTypeOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log(chalk.bold.green("server is running on localhost: 4000"));
  return app;
};
