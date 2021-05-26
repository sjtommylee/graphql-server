import { Resolver } from "../../../types/graphql-utils";
// const chalk = require("chalk");
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
  // console.log(context.session);
  // if (!context.session || !context.session.userId) {
  //   throw Error("no cookie");
  // }
  // //middleware
  // //   const result = await resolver(parent, args, {...context, loggedIn: true}, info)
  // const result = await resolver(parent, args, context, info);
  // console.log(chalk.blue.bold("result", result));
  return resolver(parent, args, context, info);
};
