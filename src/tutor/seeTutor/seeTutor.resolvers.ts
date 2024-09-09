import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 튜터 정보 조회 리졸버
const seeTutorResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  return client.tutor.findUnique({
    where: {
      id,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeTutor: protectedResolver(seeTutorResolver), // protectedResolver 적용
  },
};

export default resolvers;
