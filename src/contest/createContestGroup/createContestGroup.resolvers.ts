import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// Resolver 함수 분리
const createContestCourtResolver: Resolver = async (
  _,
  { courtName, contestId },
  { client }
) => {
  await client.contestCourt.create({
    data: {
      courtName,
      contest: {
        connect: {
          contestId,
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
    createContestCourt: createContestCourtResolver,
  },
};

export default resolvers;
