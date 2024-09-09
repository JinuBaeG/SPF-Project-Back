import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const seeGroupResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  try {
    // 그룹 조회
    const group = await client.group.findUnique({
      where: {
        id,
      },
    });

    // 그룹이 존재하지 않을 때
    if (!group) {
      return {
        ok: false,
        error: "그룹을 찾을 수 없습니다.",
      };
    }

    return {
      ok: true,
      group,
    };
  } catch (error) {
    console.error("그룹 조회 실패:", error);
    return {
      ok: false,
      error: "그룹 조회 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeGroup: protectedResolver(seeGroupResolver),
  },
};

export default resolvers;
