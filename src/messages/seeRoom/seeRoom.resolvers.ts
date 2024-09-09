import { protectedResolver } from "../../users/users.utils";
import { Resolver } from "../../types"; // TypeScript 타입을 위한 import

// seeRoom resolver
const seeRoomResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  // 해당 방을 찾기
  const room = await client.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

  // 방이 존재하지 않을 경우 처리
  if (!room) {
    return {
      ok: false,
      error: "방을 찾을 수 없습니다.",
    };
  }

  return {
    ok: true,
    room,
  };
};

export default {
  Query: {
    seeRoom: protectedResolver(seeRoomResolver),
  },
};
