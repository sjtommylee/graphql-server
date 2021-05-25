import { Resolver } from "../../types/graphql-utils";

/**
 * takes resolver as the parameter, and it can do anything it wants.
 */

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  //middleware
  //   const result = await resolver(parent, args, {...context, loggedIn: true}, info)
  const result = await resolver(parent, args, context, info);
  return result;
};
