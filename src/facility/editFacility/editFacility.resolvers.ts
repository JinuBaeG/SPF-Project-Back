import { uploadToLocals } from "../../shared/shared.util";
import { Resolver, Resolvers } from "../../types";

// editFacilityResolvers 함수 정의
const editFacilityResolvers: Resolver = async (
  _,
  { id, title, description, sortation, facilityBannerImage },
  { client }
) => {
  try {
    let bannerImagePath;

    if (facilityBannerImage) {
      // facilityBannerImage가 있을 경우 로컬에 업로드
      bannerImagePath = await uploadToLocals(facilityBannerImage, sortation);

      // 업로드된 이미지 경로가 있는지 확인
      if (!bannerImagePath || bannerImagePath.length === 0) {
        return { ok: false, error: "배너 이미지를 업로드하는 데 실패했습니다." };
      }
    }

    // facilityImage 업데이트 처리
    const updateData: any = {
      title,
      description,
      sortation,
    };

    if (bannerImagePath) {
      updateData.facilityImage = {
        updateMany: {
          where: {
            facilityId: id,
          },
          data: {
            path: bannerImagePath[0], // 이미지 경로를 설정
          },
        },
      };
    }

    // 시설 정보 업데이트
    const result = await client.facility.update({
      data: updateData,
      where: {
        id,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.error("시설 수정 실패:", error);
    return {
      ok: false,
      error: "시설 정보를 수정하는 데 실패했습니다. 다시 시도해 주세요.",
    };
  }
};

// 전체 리졸버
const resolvers: Resolvers = {
  Mutation: {
    editFacility: editFacilityResolvers,
  },
};

export default resolvers;
