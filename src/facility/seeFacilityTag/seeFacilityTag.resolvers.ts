import { Resolver, Resolvers } from "../../types";

// seeFacilityTag 쿼리 리졸버
const seeFacilityTagResolvers: Resolver = async (
  _,
  { offset },
  { client }
) => {
  try {
    // 시설 태그 목록 조회, offset을 기반으로 페이징 처리
    const facilityTags = await client.facilityTag.findMany({
      take: 10, // 한 번에 10개의 태그 반환 (원하는 대로 설정 가능)
      skip: offset,
    });

    return {
      ok: true,
      facilityTags,
    };
  } catch (error) {
    console.error("시설 태그 조회 실패:", error);
    return {
      ok: false,
      error: "시설 태그 목록을 불러오는 중 문제가 발생했습니다.",
    };
  }
};

// 전체 리졸버
const resolvers: Resolvers = {
  Query: {
    seeFacilityTag: seeFacilityTagResolvers,
  },
};

export default resolvers;
