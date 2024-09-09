import { Resolvers } from "../../types";
import client from "../../client";

const resolvers: Resolvers = {
  Mutation: {
    unBlock: async (_, { id }, { loggedInUser }) => {
      try {
        const blockRecord = await client.blockUser.findUnique({
          where: {
            id,
          },
        });

        if (!blockRecord) {
          return {
            ok: false,
            error: "차단 기록을 찾을 수 없습니다.",
          };
        }

        if (blockRecord.userId !== loggedInUser?.id) {
          return {
            ok: false,
            error: "이 작업을 수행할 권한이 없습니다.",
          };
        }

        await client.blockUser.delete({
          where: {
            id,
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "차단 해제 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default resolvers;
