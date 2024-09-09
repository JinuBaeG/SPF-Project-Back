import { Resolvers } from "../../types";
import { uploadToLocals } from "../../shared/shared.util";

const editBannerResolvers: Resolvers = {
  Mutation: {
    editBanner: async (
      _,
      { id, title, description, sortation, titleBannerImage },
      { client }
    ) => {
      try {
        let bannerImagePath: string[] = [];

        // 이미지가 제공되었을 때만 업로드 처리
        if (titleBannerImage) {
          bannerImagePath = await uploadToLocals(titleBannerImage, sortation);
        }

        // 배너 수정
        const updatedBanner = await client.banner.update({
          data: {
            title,
            description,
            sortation,
            ...(bannerImagePath.length > 0 && { bannerImagePath: bannerImagePath[0] }),
          },
          where: {
            id,
          },
        });

        if (!updatedBanner) {
          return {
            ok: false,
            error: "배너를 찾을 수 없습니다.",
          };
        }

        return {
          ok: true,
        };
      } catch (error) {
        console.error("배너 수정 중 오류 발생:", error);
        return {
          ok: false,
          error: "배너 수정 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default editBannerResolvers;
