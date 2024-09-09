import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 사용자 조회 리졸버
const seeUserResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  return client.user.findUnique({
    where: {
      id,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeUser: protectedResolver(seeUserResolver), // protectedResolver 적용
  },
};

export default resolvers;
