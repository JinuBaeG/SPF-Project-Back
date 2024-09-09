import { Resolver, Resolvers } from "../../types";

// seeSearchFacilitiesResolvers 함수 정의
const seeSearchFacilitiesResolvers: Resolver = async (
  _,
  { offset, sportsEvent, maxX, maxY, minX, minY },
  { client }
) => {
  try {
    // 기본 where 조건 설정 (좌표 범위)
    const whereCondition: any = {
      AND: [
        {
          areaLatitude: {
            gte: minY,
            lte: maxY,
          },
        },
        {
          areaLongitude: {
            gte: minX,
            lte: maxX,
          },
        },
      ],
    };

    // sportsEvent 필터 추가 (모든 종목 제외)
    if (sportsEvent && sportsEvent !== "모든 종목") {
      whereCondition.facilitySports = {
        some: {
          name: sportsEvent,
        },
      };
    }

    // 시설 목록 조회
    const facilities = await client.facility.findMany({
      take: 3,
      skip: offset,
      where: whereCondition,
      orderBy: {
        createdAt: "desc",
      },
    });

    return facilities;
  } catch (error) {
    console.error("시설 검색 실패:", error);
    throw new Error("시설을 검색하는 중 문제가 발생했습니다.");
  }
};

// 전체 리졸버
const resolvers: Resolvers = {
  Query: {
    seeSearchFacilities: seeSearchFacilitiesResolvers,
  },
};

export default resolvers;
