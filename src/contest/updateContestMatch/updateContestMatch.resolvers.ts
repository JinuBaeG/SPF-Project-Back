import { Resolver, Resolvers } from "../../types";

const updateContestMatchResolver: Resolver = async (_, { contestGroupId }, { client }) => {
  // contestTierGroup 테이블에서 contestGroupId에 해당하는 그룹의 createMatchYN 값을 true로 업데이트
  await client.contestTierGroup.update({
    where: {
      id: contestGroupId,
    },
    data: {
      createMatchYN: true,
    },
  });

  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    updateContestMatch: updateContestMatchResolver,
  },
};

export default resolvers;
