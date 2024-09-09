import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const seeSearchGroupsResolver: Resolver = async (
  _,
  { offset, sportsEvent },
  { loggedInUser }
) => {
  try {
    // 기본 where 조건 설정
    const whereCondition: any = {};

    if (sportsEvent && sportsEvent !== "모든 종목") {
      whereCondition.sportsEvent = sportsEvent;
    }

    // 그룹 검색
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
    console.error("그룹 검색 실패:", error);
    return {
      ok: false,
      error: "그룹을 검색하는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeSearchGroups: protectedResolver(seeSearchGroupsResolver),
  },
};

export default resolvers;
