import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver, Resolvers } from "../../types";
import { User } from "@prisma/client"; // Prisma의 User 타입 사용

// 로그인 여부를 확인하는 헬퍼 함수
const checkLoggedInUser = (loggedInUser: User | null): void => {
  if (!loggedInUser) {
    throw new Error("로그인이 필요합니다.");
  }
};

// 구독을 위한 room 체크 resolver
const roomCheckResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  checkLoggedInUser(loggedInUser);

  const room = await client.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser!.id, // 여기서 loggedInUser는 null이 아님이 보장됨
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!room) {
    throw new Error("You shall not see this.");
  }

  return room;
};

// 필터링된 메시지 전송 resolver
const roomUpdatesFilter: Resolver = async ({ roomUpdates }, { id }, { loggedInUser, client }) => {
  if (roomUpdates.roomId === id) {
    checkLoggedInUser(loggedInUser);

    const room = await client.room.findFirst({
      where: {
        id,
        users: {
          some: {
            id: loggedInUser!.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return !!room;
  }
  return false;
};

// 전체 구독 resolver 정의
const roomUpdatesSubscribe: Resolver = async (root, args, context, info) => {
  await roomCheckResolver(root, args, context, info); // 방 존재 확인 및 사용자 권한 확인

  return withFilter(
    () => pubsub.asyncIterator(NEW_MESSAGE),
    roomUpdatesFilter
  )(root, args, context, info);
};

// Resolvers 구조
const resolvers: Resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: roomUpdatesSubscribe,
    },
  },
};

export default resolvers;
