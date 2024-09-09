import { Resolvers } from "../../types";

const deleteAdminNoticeResolvers: Resolvers = {
  Mutation: {
    deleteAdminNotice: async (_, { id }, { client }) => {
      try {
        const existingNotice = await client.adminNotice.findUnique({
          where: { id },
        });

        if (!existingNotice) {
          return {
            ok: false,
            error: "존재하지 않는 공지사항입니다.",
          };
        }

        await client.adminNotice.delete({
          where: { id },
        });

        return {
          ok: true,
        };
      } catch (error) {
        console.error("공지사항 삭제 중 오류:", error);
        return {
          ok: false,
          error: "공지사항 삭제 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default deleteAdminNoticeResolvers;
