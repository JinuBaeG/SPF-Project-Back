import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// Resolver 함수 분리
const createContestGroupMatchResolver: Resolver = async (
  _,
  { groupNo, contestId, contestGroupId },
  { client }
) => {
  await client.contestMatchGroup.create({
    data: {
      groupNo,
      contest: {
        connect: {
          contestId,
        },
      },
      contestTierGroup: {
        connect: {
          id: contestGroupId,
        },
      },
    },
  });

  return {
    ok: true,
  };
};

// Resolvers 객체
const resolvers: Resolvers = {
  Mutation: {
    createContestGroupMatch: createContestGroupMatchResolver,
  },
};

export default resolvers;
