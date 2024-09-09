import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const seeGroupsResolver: Resolver = async (
  _,
  { offset, sportsEvent },
  { loggedInUser }
) => {
  try {
    // 기본 where 조건 설정
    let whereCondition: any = {};

    // 특정 종목을 선택한 경우
    if (sportsEvent && sportsEvent !== "모든 종목") {
      whereCondition.sportsEvent = sportsEvent;
    }

    // 그룹 목록 조회
    const groups = await client.group.findMany({
      take: 3,
      skip: offset,
      where: whereCondition,
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      ok: true,
      groups,
    };
  } catch (error) {
    console.error("그룹 목록 조회 실패:", error);
    return {
      ok: false,
      error: "그룹 목록을 불러오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeGroups: seeGroupsResolver,
  },
};

export default resolvers;
