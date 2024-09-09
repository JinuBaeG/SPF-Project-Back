import { Resolver, Resolvers } from "../../types";

const setSportsEventResolver: Resolver = async (_, { id }, { client }) => {
  try {
    const group = await client.group.findUnique({
      where: {
        id,
      },
      select: {
        sportsEvent: true,
      },
    });

    // 그룹이 존재하지 않는 경우 처리
    if (!group) {
      return {
        ok: false,
        error: "그룹을 찾을 수 없습니다.",
      };
    }

    return {
      ok: true,
      sportsEvent: group.sportsEvent,
    };
  } catch (error) {
    console.error("스포츠 이벤트 조회 실패:", error);
    return {
      ok: false,
      error: "스포츠 이벤트를 조회하는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    setSportsEvent: setSportsEventResolver,
  },
};

export default resolvers;
