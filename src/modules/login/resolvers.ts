import { ResolverMap } from "../../types/graphql-utils";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { confirmEmailError, invalidLogin } from "./errorMessages";
// import session from "express-session";
const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];
export const resolvers: ResolverMap = {
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return errorResponse;
      }

      if (!user.confirmed) {
        return [
          {
            path: "email",
            message: confirmEmailError,
          },
        ];
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return errorResponse;
      }
      session.userId = user.id;
      return null;
    },
  },
};
