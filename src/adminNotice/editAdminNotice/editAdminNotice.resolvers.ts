import { Resolvers } from "../../types";

const editAdminNoticeResolvers: Resolvers = {
  Mutation: {
    editAdminNotice: async (
      _,
      { id, title, description },
      { client }
    ) => {
      try {
        const existingNotice = await client.adminNotice.findUnique({
          where: { id },
        });

        if (!existingNotice) {
          return {
            ok: false,
            error: "수정할 공지사항이 존재하지 않습니다.",
          };
        }

        await client.adminNotice.update({
          where: { id },
          data: {
            title,
            description,
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        console.error("공지사항 수정 중 오류:", error);
        return {
          ok: false,
          error: "공지사항 수정 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default editAdminNoticeResolvers;
