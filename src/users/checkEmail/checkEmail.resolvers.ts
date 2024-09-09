import client from "../../client";
import { Resolvers } from "../../types";

const checkEmailResolvers: Resolvers = {
  Mutation: {
    checkEmail: async (_, { email }: { email: string }) => {
      try {
        const check = await client.user.findUnique({
          where: {
            email,
          },
        });

        if (check) {
          return {
            ok: false,
            error: "이미 존재하는 이메일입니다.",
          };
        } else {
          return {
            ok: true,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: "이메일 확인 중 오류가 발생하였습니다.",
        };
      }
    },
  },
};

export default checkEmailResolvers;
