import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const withdrawGroupResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  try {
    // 사용자가 그룹에 속해 있는지 확인
    const joinCheck = await client.group.findFirst({
      where: {
        id,
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
    });

    // 그룹에 가입되어 있지 않으면 에러 반환
    if (!joinCheck) {
      return {
        ok: false,
        error: "가입되지 않은 그룹입니다.",
      };
    }

    // 사용자를 그룹에서 연결 해제 (성공시 ok 반환)
    await client.group.update({
      where: { id },
      data: {
        users: {
          disconnect: { id: loggedInUser.id },
        },
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error withdrawing from group:", error);
    return {
      ok: false,
      error: "그룹에서 탈퇴하는 도중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    withdrawGroup: protectedResolver(withdrawGroupResolver),
  },
};

export default resolvers;
