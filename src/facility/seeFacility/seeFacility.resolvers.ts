import { Resolver, Resolvers } from "../../types";

// seeFacilityResolvers 함수 정의
const seeFacilityResolvers: Resolver = async (
  _,
  { id },
  { client }
) => {
  try {
    // 시설 조회
    const facility = await client.facility.findUnique({
      where: {
        id,
      },
    });

    // 시설이 없을 경우
    if (!facility) {
      return {
        ok: false,
        error: "해당 시설을 찾을 수 없습니다.",
      };
    }

    return {
      ok: true,
      facility,
    };
  } catch (error) {
    console.error("시설 조회 실패:", error);
    return {
      ok: false,
      error: "시설 정보를 불러오는 중 문제가 발생했습니다.",
    };
  }
};

// 전체 리졸버
const resolvers: Resolvers = {
  Query: {
    seeFacility: seeFacilityResolvers,
  },
};

export default resolvers;
