import { Resolver, Resolvers } from "../../types";

// deleteFacilityResolvers 함수 정의 (Resolver 타입 적용)
const deleteFacilityResolvers: Resolver = async (
  _,
  { id },
  { client, loggedInUser }
) => {
  try {
    // 로그인이 되어 있는지 체크
    if (!loggedInUser) {
      return { ok: false, error: "로그인이 필요합니다." };
    }

    // 시설 삭제
    await client.facility.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.error("시설 삭제 실패:", error);
    return {
      ok: false,
      error: "시설을 삭제하는 데 실패했습니다. 다시 시도해 주세요.",
    };
  }
};

// 전체 리졸버 (Resolvers 타입 적용)
const resolvers: Resolvers = {
  Mutation: {
    deleteFacility: deleteFacilityResolvers,
  },
};

export default resolvers;
