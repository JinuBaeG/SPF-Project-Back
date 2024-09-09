import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";
import { Resolver } from "../../types";

// sendMessage resolver
const sendMessageResolver: Resolver = async (
  _,
  { payload, roomId, userId },
  { loggedInUser, client }
) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  
  let room = null;

  // 1. 특정 유저에게 메시지를 보내는 경우
  if (userId) {
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    // 유저가 존재하지 않을 때 처리
    if (!user) {
      return {
        ok: false,
        error: "해당 사용자를 찾을 수 없습니다.",
      };
    }

    // 새로운 채팅방 생성
    room = await client.room.create({
      data: {
        users: {
          connect: [
            {
              id: userId,
            },
            {
              id: loggedInUser.id,
            },
          ],
        },
      },
    });
  } 
  // 2. 기존 방에 메시지를 보내는 경우
  else if (roomId) {
    room = await client.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
      },
    });

    // 방이 존재하지 않을 때 처리
    if (!room) {
      return {
        ok: false,
        error: "채팅방을 찾을 수 없습니다.",
      };
    }
  }

  // room이 null이 아닐 때만 메시지 생성
  if (!room) {
    return {
      ok: false,
      error: "채팅방을 생성하거나 찾을 수 없습니다.",
    };
  }

  // 메시지 생성
  const message = await client.message.create({
    data: {
      payload,
      room: {
        connect: {
          id: room.id, // room이 null이 아님이 보장됨
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });

  // 실시간으로 메시지 구독자에게 알림
  pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });

  return {
    ok: true,
    id: message.id,
  };
};

export default {
  Mutation: {
    sendMessage: protectedResolver(sendMessageResolver),
  },
};
