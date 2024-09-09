import { Resolvers } from "../../types";

const seeBannerResolvers: Resolvers = {
  Query: {
    seeBanner: async (_, { id }, { client }) => {
      try {
        const banner = await client.banner.findUnique({
          where: {
            id,
          },
        });

        if (!banner) {
          return {
            ok: false,
            error: "배너를 찾을 수 없습니다.",
          };
        }

        return {
          ok: true,
          banner,
        };
      } catch (error) {
        console.error("배너 조회 중 오류 발생:", error);
        return {
          ok: false,
          error: "배너 조회 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default seeBannerResolvers;
