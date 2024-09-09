import { protectedResolver } from "../../users/users.utils";
import { Resolver } from "../../types"; // Resolver 타입 import

// seeRooms resolver
const seeRoomsResolver: Resolver = async (_, __, { loggedInUser, client }) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  // 사용자가 속한 모든 방 조회
  const rooms = await client.room.findMany({
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

  return {
    ok: true,
    rooms,
  };
};

export default {
  Query: {
    seeRooms: protectedResolver(seeRoomsResolver),
  },
};
