import { ResolverMap } from "types/graphql-utils";
import { User } from "entity/User";
import { confirmEmailError, invalidLogin } from "../login/errorMessages";
import * as bcrypt from "bcryptjs";
const errorResponse = [
  {
    path: "email",
    message: invalidLogin,
  },
];
export const resolvers: ResolverMap = {
  Query: {
    dummy2: () => "bye",
  },
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session, redis, req }
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
      if (req.sessionID) {
        await redis.lpush(`SID: ${user.id}, ${req.sessionID}`);
      }
      //creates an array and add one element, or push the elements on to the array if it esits
      return null;
    },
  },
};
