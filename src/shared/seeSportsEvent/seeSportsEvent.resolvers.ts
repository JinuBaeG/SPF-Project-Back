import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 스포츠 이벤트 조회 리졸버
const seeSportsEventResolver : Resolver = async (_, { offset }, { client }) => {
  return client.sportsEvent.findMany({
    select: {
      id: true,
      name: true,
      imagePath: true,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeSportsEvent: seeSportsEventResolver,
  },
};

export default resolvers;
