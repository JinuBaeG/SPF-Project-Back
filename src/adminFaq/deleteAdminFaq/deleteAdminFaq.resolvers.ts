import { Resolvers } from "../../types";

const deleteAdminFaqResolvers: Resolvers = {
  Mutation: {
    deleteAdminFaq: async (_, { id }, { client }) => {
      try {
        await client.adminFaq.delete({
          where: {
            id,
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        console.error("FAQ 삭제 중 오류:", error);
        return {
          ok: false,
          error: "FAQ 삭제 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default deleteAdminFaqResolvers;
