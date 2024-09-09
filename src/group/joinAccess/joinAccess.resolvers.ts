import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const joinAccessResolver: Resolver = async (
  _,
  { id, userId, groupId },
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
    // 그룹에 사용자 연결
    const updatedGroup = await client.group.update({
      where: {
        id: groupId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // 그룹이 업데이트되지 않았을 때
    if (!updatedGroup) {
      return {
        ok: false,
        error: "그룹에 사용자를 추가할 수 없습니다.",
      };
    }

    // 그룹 가입 요청 삭제
    const deletedJoinRequest = await client.groupJoinRequest.delete({
      where: {
        id,
      },
    });

    // 가입 요청이 삭제되지 않았을 때
    if (!deletedJoinRequest) {
      return {
        ok: false,
        error: "그룹 가입 요청을 삭제하는 데 실패했습니다.",
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error("그룹 참여 승인 실패:", error);
    return {
      ok: false,
      error: "그룹 참여 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    joinAccess: protectedResolver(joinAccessResolver),
  },
};

export default resolvers;
