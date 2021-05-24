import { ResolverMap } from "../../types/graphql-utils";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { invalidLogin } from "./errorMessages";
const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];
export const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return errorResponse;
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return errorResponse;
      }
      return null;
    },
  },
};
