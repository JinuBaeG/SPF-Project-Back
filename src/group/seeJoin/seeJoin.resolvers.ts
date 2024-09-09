import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const seeJoinResolver: Resolver = async (_, { groupId }, { client }) => {
  try {
    // 그룹 가입 요청 조회
    const joinRequests = await client.groupJoinRequest.findMany({
      where: {
        groupId,
      },
      include: {
        user: true,
        group: true,
      },
    });

    return {
      ok: true,
      joinRequests,
    };
  } catch (error) {
    console.error("그룹 가입 요청 조회 실패:", error);
    return {
      ok: false,
      error: "그룹 가입 요청을 불러오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeJoin: protectedResolver(seeJoinResolver),
  },
};

export default resolvers;
