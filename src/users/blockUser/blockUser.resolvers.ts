import client from "../../client";
import { Resolvers } from "../../types";

const blockUserResolvers: Resolvers = {
  Mutation: {
    blockUser: async (_, { id }, { loggedInUser }) => {
      if (!loggedInUser) {
        return {
          ok: false,
          error: "로그인이 필요합니다.",
        };
      }

      try {
        const block = await client.blockUser.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            blockedBy: {
              connect: {
                id,
              },
            },
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "사용자를 차단하는데 실패했습니다.",
        };
      }
    },
  },
};

export default blockUserResolvers;
