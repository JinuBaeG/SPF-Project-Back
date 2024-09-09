import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver, Resolvers } from "../../types";
import { User } from "@prisma/client";

// 로그인 여부를 확인하는 헬퍼 함수
const checkLoggedInUser = (loggedInUser: User | null): void => {
  if (!loggedInUser) {
    throw new Error("로그인이 필요합니다.");
  }
};

// 구독을 위한 room 확인 resolver
const roomCheckResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  checkLoggedInUser(loggedInUser); // 로그인 여부 확인

  const room = await client.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser!.id, // non-null assertion 사용
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
const roomUpdatesFilterResolver: Resolver = async ({ roomUpdates }, { id }, { loggedInUser, client }) => {
  checkLoggedInUser(loggedInUser);

  if (roomUpdates.roomId === id) {
    const room = await client.room.findFirst({
      where: {
        id,
        users: {
          some: {
            id: loggedInUser!.id, // non-null assertion 사용
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

// 구독을 위한 subscribe resolver
const roomUpdatesSubscribeResolver: Resolver = async (root, args, context, info) => {
  await roomCheckResolver(root, args, context, info); // 방 확인

  return withFilter(
    () => pubsub.asyncIterator(NEW_MESSAGE),
    roomUpdatesFilterResolver
  )(root, args, context, info);
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: roomUpdatesSubscribeResolver,
    },
  },
};

export default resolvers;
