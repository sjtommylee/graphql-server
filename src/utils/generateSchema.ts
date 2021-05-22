import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema } from "graphql-tools";
import * as glob from "glob";

export const genSchema = () => {
  const modulePath = path.join(__dirname, "../modules");
  const graphqlTypes = glob
    .sync(`${modulePath}/**/*.graphql`)
    .map((i: number | fs.PathLike) => fs.readFileSync(i, { encoding: "utf8" }));
  const resolvers = glob
    .sync(`${modulePath}/**/resolvers.?s`)
    .map((resolver: string) => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  });
};
