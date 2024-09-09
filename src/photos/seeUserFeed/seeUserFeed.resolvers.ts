import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 사용자 피드 조회 리졸버
const seeUserFeedResolver: Resolver = async (_, { offset, id }, { client }) => {
  return client.photo.findMany({
    take: 2,
    skip: offset,
    where: {
      user: {
        id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeUserFeed: protectedResolver(seeUserFeedResolver), // protectedResolver 적용
  },
};

export default resolvers;
