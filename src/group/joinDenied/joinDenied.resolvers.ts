import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const joinDeniedResolver: Resolver = async (
  _,
  { id, groupId },
  { client, loggedInUser }
) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  try {
    // 그룹 가입 요청 삭제
    const deletedJoinRequest = await client.groupJoinRequest.deleteMany({
      where: {
        groupId,
        userId: id,
      },
    });

    // 삭제되지 않은 경우
    if (deletedJoinRequest.count === 0) {
      return {
        ok: false,
        error: "그룹 가입 요청을 찾을 수 없거나 삭제할 수 없습니다.",
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error("그룹 참여 요청 거부 실패:", error);
    return {
      ok: false,
      error: "그룹 참여 요청 거부 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    joinDenied: protectedResolver(joinDeniedResolver),
  },
};

export default resolvers;
