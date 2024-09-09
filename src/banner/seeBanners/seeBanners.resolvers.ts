import { Resolvers } from "../../types";

const seeBannersResolvers: Resolvers = {
  Query: {
    seeBanners: async (_, { offset = 0 }, { client }) => {
      try {
        const banners = await client.banner.findMany({
          take: 10, // 한 번에 10개의 배너만 반환
          skip: offset, // 페이지네이션을 위한 offset
          orderBy: {
            createdAt: "desc",
          },
        });

        return {
          ok: true,
          banners,
        };
      } catch (error) {
        console.error("배너 목록 조회 중 오류 발생:", error);
        return {
          ok: false,
          error: "배너 목록 조회 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default seeBannersResolvers;
