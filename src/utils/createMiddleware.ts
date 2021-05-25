import { GraphQLMiddlewareFunc, Resolver } from "../types/graphql-utils";

/**
 * @function createMiddleware - a higher order function that takes two args
 * @param middlewareFunc
 * @param resolverFunc
 * @returns - a regular resolver. which will just return the middleware
 */

export const createMiddleware =
  (middlewareFunc: GraphQLMiddlewareFunc, resolverFunc: Resolver) =>
  (parent: any, args: any, context: any, info: any) =>
    middlewareFunc(resolverFunc, parent, args, context, info);
