import { Resolver, Resolvers } from "../../types";

// 해시태그 조회 리졸버
const seeHashtagResolver: Resolver = (_, { hashtag }, { client }) => {
  return client.hashtag.findUnique({
    where: {
      hashtag,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeHashtag: seeHashtagResolver,
  },
};

export default resolvers;
