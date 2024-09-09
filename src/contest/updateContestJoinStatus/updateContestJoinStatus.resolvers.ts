import { Resolver, Resolvers } from "../../types";

const updateContestJoinStatusResolver: Resolver = async (
  _,
  { contestPaymentId, status },
  { client }
) => {
  // contestUser 테이블에서 contestPaymentId에 해당하는 결제 상태를 업데이트
  await client.contestUser.update({
    where: {
      contestPaymentId,
    },
    data: {
      contestPaymentStatus: status,
    },
  });

  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    updateContestJoinStatus: updateContestJoinStatusResolver,
  },
};

export default resolvers;
