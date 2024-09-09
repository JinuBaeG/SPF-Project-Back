import { Resolvers } from "../../types";

const createAdminFaqResolvers: Resolvers = {
  Mutation: {
    createAdminFaq: async (_, { title, description }, { client }) => {
      try {
        // 관리자 FAQ 생성
        const result = await client.adminFaq.create({
          data: {
            title,
            description,
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        console.error("FAQ 생성 중 오류:", error);
        return {
          ok: false,
          error: "FAQ 생성 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default createAdminFaqResolvers;
