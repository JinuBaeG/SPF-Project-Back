import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const joinGroupResolver: Resolver = async (
  _,
  { id },
  { loggedInUser, client }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  
  try {
    // 그룹 찾기
    const group = await client.group.findUnique({
      where: {
        id,
      },
    });
    if (!group) {
      return {
        ok: false,
        error: "그룹을 찾을 수 없습니다.",
      };
    }

    // 그룹 참여 요청 여부 확인
    const joinWhere = {
      userId_groupId: {
        groupId: id,
        userId: loggedInUser.id,
      },
    };

    const existingJoinRequest = await client.groupJoinRequest.findUnique({
      where: joinWhere,
    });

    if (existingJoinRequest) {
      // 이미 요청한 경우, 요청 삭제
      await client.groupJoinRequest.delete({
        where: joinWhere,
      });
    } else {
      // 요청이 없는 경우, 새로운 요청 생성
      await client.groupJoinRequest.create({
        data: {
          group: {
            connect: { id },
          },
          user: {
            connect: { id: loggedInUser.id },
          },
        },
      });
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error("그룹 참여 요청 처리 실패:", error);
    return {
      ok: false,
      error: "그룹 참여 요청 처리 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    joinGroup: protectedResolver(joinGroupResolver),
  },
};

export default resolvers;
