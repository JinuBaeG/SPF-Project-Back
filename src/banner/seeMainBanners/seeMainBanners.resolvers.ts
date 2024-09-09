import { Resolvers } from "../../types";

const seeMainBannersResolvers: Resolvers = {
  Query: {
    seeMainBanners: async (_, { offset, sortation }, { client }) => {
      try {
        const banners = await client.banner.findMany({
          take: offset,
          where: {
            sortation,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (!banners || banners.length === 0) {
          return {
            ok: false,
            error: "배너를 찾을 수 없습니다.",
          };
        }

        return {
          ok: true,
          banners,
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

export default seeMainBannersResolvers;
