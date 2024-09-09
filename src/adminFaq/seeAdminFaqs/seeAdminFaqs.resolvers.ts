import { Resolvers } from "../../types";

const seeAdminFaqsResolvers: Resolvers = {
  Query: {
    seeAdminFaqs: async (_, { offset }, { client }) => {
      try {
        const faqs = await client.adminFaq.findMany({
          skip: offset, // offset을 통해 페이지네이션 처리
          take: 10, // 한 번에 가져올 FAQ의 수 (필요에 따라 조정 가능)
          orderBy: {
            createdAt: "desc", // 최신 순으로 정렬
          },
        });

        return {
          ok: true,
          faqs,
        };
      } catch (error) {
        console.error("FAQ 목록 조회 중 오류:", error);
        return {
          ok: false,
          error: "FAQ 목록 조회 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default seeAdminFaqsResolvers;
