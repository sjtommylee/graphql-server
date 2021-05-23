import { ResolverMap } from "../../types/graphql-utils";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import * as yup from "yup";
import { formatYupError } from "../../utils/formatYupError";
import {
  duplicateEmail,
  invaldPasswordLength,
  invalidEmail,
  invalidEmailLength,
} from "./errorMessages";
import confirmationEmail from "../../utils/confirmationEmail";
/**
 * @schema - you can pass in an additional argument in a field to set a different error message. ie: ()
 */
const schema = yup.object().shape({
  email: yup.string().min(3, invalidEmailLength).max(255).email(invalidEmail),
  password: yup.string().min(3, invaldPasswordLength).max(255),
});

export const resolvers: ResolverMap = {
  Query: {
    bye: () => "Bye",
  },
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        // console.log(err);
        return formatYupError(err);
      }
      const { email, password } = args;
      //finding a user if it exists, if a user exists, return the error message in the obj.
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"],
      });
      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicateEmail,
          },
        ];
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword,
      });
      user.save();

      await confirmationEmail(url, user.id, redis);

      return null;
    },
  },
};
