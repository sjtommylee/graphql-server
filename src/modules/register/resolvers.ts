import { ResolverMap } from "../../types/graphql-utils";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import * as yup from "yup";
import { formatYupError } from "../../utils/formatYupError";
import { duplicateEmail } from "./errorMessages";
/**
 * @schema - you can pass in an additional argument in a field to set a different error message. ie: ()
 */
const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255),
});

export const resolvers: ResolverMap = {
  Query: {
    bye: () => "Bye",
  },
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
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
      return null;
    },
  },
};
