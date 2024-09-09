import client from "../../client";
import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const changePasswordResolver: Resolvers = {
  Mutation: {
    changePassword: async (_, { id, password }: { id: string; password: string }) => {
      try {
        // Hash the new password
        const uglyPassword = await bcrypt.hash(password, 10);

        // Update the user with the hashed password
        const updateUser = await client.user.update({
          where: {
            id,
          },
          data: {
            password: uglyPassword,
          },
        });

        return {
          ok: !!updateUser.id,
        };
      } catch (error) {
        return {
          ok: false,
          error: "변경 중 오류가 발생하였습니다.",
        };
      }
    },
  },
};

export default changePasswordResolver;
