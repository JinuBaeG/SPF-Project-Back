import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// Resolver 함수 분리
const checkJoinContestResolver: Resolver = async (
  _,
  { contestId, userId }
) => {
  return await client.contestUser.findUnique({
    where: {
      contestId_userId: {
        contestId,
        userId,
      },
    },
  });
};

// Resolvers 객체
const resolvers: Resolvers = {
  Query: {
    checkJoinContest: checkJoinContestResolver,
  },
};

export default resolvers;
