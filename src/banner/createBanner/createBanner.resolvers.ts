import { Resolvers } from "../../types";
import { uploadToLocals } from "../../shared/shared.util";

const createBannerResolvers: Resolvers = {
  Mutation: {
    createBanner: async (
      _,
      { title, description, sortation, titleBannerImage },
      { client }
    ) => {
      try {
        let bannerImagePath: string[] = [];
        if (titleBannerImage) {
          bannerImagePath = await uploadToLocals(titleBannerImage, sortation);
        }

        const result = await client.banner.create({
          data: {
            title,
            description,
            sortation,
            ...(bannerImagePath.length > 0 && {
              bannerImagePath: bannerImagePath[0],
            }),
          },
        });

        return {
          ok: true,
        };
      } catch (error) {
        console.error("배너 생성 중 오류:", error);
        return {
          ok: false,
          error: "배너 생성 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default createBannerResolvers;
