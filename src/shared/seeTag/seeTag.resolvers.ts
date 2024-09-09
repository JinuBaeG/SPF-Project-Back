import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 태그 조회 리졸버
const seeTagResolver: Resolver = async (_, { sortation }, { client }) => {
  if (sortation !== undefined && sortation !== null) {
    // sortation 값이 있는 경우 해당 값으로 필터링하여 태그 조회
    return client.tag.findMany({
      where: {
        sortation,
      },
    });
  } else {
    // sortation 값이 없는 경우 모든 태그 조회
    return client.tag.findMany({});
  }
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeTag: seeTagResolver,
  },
};

export default resolvers;
