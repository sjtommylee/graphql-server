import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
import * as path from "path";
import { createTypeOrmConnection } from "./utils/createTypeOrmConnection";

export const startServer = async () => {
  const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
  const server = new GraphQLServer({ typeDefs, resolvers });
  await createTypeOrmConnection();
  await server.start();
  console.log("server is running on localhost: 4000");
};

startServer();
