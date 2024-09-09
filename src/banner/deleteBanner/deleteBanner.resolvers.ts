import { Resolvers } from "../../types";

const deleteBannerResolvers: Resolvers = {
  Mutation: {
    deleteBanner: async (_, { id }, { client }) => {
      try {
        const banner = await client.banner.findUnique({
          where: { id },
        });

        if (!banner) {
          return {
            ok: false,
            error: "해당 배너가 존재하지 않습니다.",
          };
        }

        await client.banner.delete({
          where: { id },
        });

        return {
          ok: true,
        };
      } catch (error) {
        console.error("배너 삭제 중 오류:", error);
        return {
          ok: false,
          error: "배너 삭제 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default deleteBannerResolvers;
