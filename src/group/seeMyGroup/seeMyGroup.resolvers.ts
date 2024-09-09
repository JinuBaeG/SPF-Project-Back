import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const seeMyGroupResolver: Resolver = async (
  _,
  { offset, sportsEvent },
  { loggedInUser, client }
) => {
  // 로그인이 되어 있는지 체크
  if (!loggedInUser) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  try {
    // 기본 where 조건 설정
    const whereCondition: any = {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    };

    // 특정 종목 선택 시 필터 추가
    if (sportsEvent && sportsEvent !== "모든 종목") {
      whereCondition.sportsEvent = sportsEvent;
    }

    // 그룹 목록 조회
    const groups = await client.group.findMany({
      take: 5,
      skip: offset,
      where: whereCondition,
      select: {
        id: true,
        name: true,
        groupImage: true,
      },
    });

    return {
      ok: true,
      groups,
    };
  } catch (error) {
    console.error("그룹 조회 실패:", error);
    return {
      ok: false,
      error: "그룹을 조회하는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeMyGroup: protectedResolver(seeMyGroupResolver),
  },
};

export default resolvers;
