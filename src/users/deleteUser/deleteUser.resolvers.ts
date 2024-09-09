import client from "../../client";
import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const deleteUserResolvers: Resolvers = {
  Mutation: {
    deleteUser: async (
      _,
      { password }: { password: string },
      { loggedInUser }: { loggedInUser?: { id: string } | null }
    ) => {
      // 로그인되지 않았을 경우 처리
      if (!loggedInUser) {
        return {
          ok: false,
          error: "로그인이 필요합니다.",
        };
      }

      const user = await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
        select: {
          password: true,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다.",
        };
      }

      const checkPw = await bcrypt.compare(password, user.password);
      if (checkPw) {
        await client.user.delete({
          where: {
            id: loggedInUser.id,
          },
        });

        return {
          ok: true,
        };
      }

      return {
        ok: false,
        error: "올바르지 않은 비밀번호 입니다.",
      };
    },
  },
};

export default deleteUserResolvers;
