import { Resolvers } from "../../types";

const createAdminNoticeResolvers: Resolvers = {
  Mutation: {
    createAdminNotice: async (_, { title, description }, { client }) => {
      try {
        const result = await client.adminNotice.create({
          data: {
            title,
            description,
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        console.error("Admin Notice 생성 중 오류:", error);
        return {
          ok: false,
          error: "공지사항 생성 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default createAdminNoticeResolvers;
