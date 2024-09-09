import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 메인 스포츠 이벤트 조회 리졸버
const seeSportsEventMainResolver : Resolver = async (_, { offset }, { client }) => {
  return client.sportsEvent.findMany({
    take: 10, // 최대 10개의 이벤트 조회
    skip: offset, // 오프셋 설정
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
    seeSportsEventMain: seeSportsEventMainResolver,
  },
};

export default resolvers;
