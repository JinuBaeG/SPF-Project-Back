import { Resolvers } from "../../types";

const seeAdminEditFaqResolvers: Resolvers = {
  Query: {
    seeAdminEditFaq: async (_, { id }, { client }) => {
      try {
        const faq = await client.adminFaq.findUnique({
          where: {
            id,
          },
        });

        if (!faq) {
          return {
            ok: false,
            error: "FAQ를 찾을 수 없습니다.",
          };
        }

        return {
          ok: true,
          faq,
        };
      } catch (error) {
        console.error("FAQ 조회 중 오류:", error);
        return {
          ok: false,
          error: "FAQ 조회 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default seeAdminEditFaqResolvers;
