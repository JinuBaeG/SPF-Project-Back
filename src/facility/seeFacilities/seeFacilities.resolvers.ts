import { Resolver, Resolvers } from "../../types";

// seeFacilitiesResolvers 함수 정의
const seeFacilitiesResolvers: Resolver = async (
  _,
  { offset, sportsEvent, maxX, maxY, minX, minY },
  { client }
) => {
  try {
    // 기본 조건 정의
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

    // sportsEvent 필터 추가
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
    console.error("시설 목록 조회 실패:", error);
    throw new Error("시설 목록을 불러오는 중 문제가 발생했습니다.");
  }
};

// 전체 리졸버
const resolvers: Resolvers = {
  Query: {
    seeFacilities: seeFacilitiesResolvers,
  },
};

export default resolvers;
