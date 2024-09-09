import { Resolvers } from "../../types";

const seeAdminNoticeResolvers: Resolvers = {
  Query: {
    seeAdminNotice: async (_, { id }, { client }) => {
      try {
        const notice = await client.adminNotice.findUnique({
          where: {
            id,
          },
        });

        if (!notice) {
          return {
            ok: false,
            error: "해당 공지사항을 찾을 수 없습니다.",
          };
        }

        return {
          ok: true,
          notice,
        };
      } catch (error) {
        console.error("공지사항 조회 중 오류:", error);
        return {
          ok: false,
          error: "공지사항 조회 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default seeAdminNoticeResolvers;
