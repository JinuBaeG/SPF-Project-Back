import client from "../client";
import { Resolver, Resolvers } from "../types";

// 방의 유저 목록을 가져오는 리졸버
const usersResolver: Resolver = ({ id }) => {
  return client.room.findUnique({ where: { id } }).users();
};

// 방의 메시지 목록을 가져오는 리졸버
const messagesResolver: Resolver = ({ id }) => {
  return client.message.findMany({
    where: {
      roomId: id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

// 읽지 않은 메시지의 총합을 계산하는 리졸버
const unreadTotalResolver: Resolver = async ({ id }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return 0; // 로그인하지 않은 경우 읽지 않은 메시지 0 처리
  }
  return client.message.count({
    where: {
      read: false,
      roomId: id,
      user: {
        id: {
          not: loggedInUser.id, // 본인이 보낸 메시지는 제외
        },
      },
    },
  });
};

// 메시지 작성자를 가져오는 리졸버
const messageUserResolver: Resolver = ({ id }) => {
  return client.message.findUnique({ where: { id } }).user();
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Room: {
    users: usersResolver,
    messages: messagesResolver,
    unreadTotal: unreadTotalResolver,
  },
  Message: {
    user: messageUserResolver,
  },
};

export default resolvers;
