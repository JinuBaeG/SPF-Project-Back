import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const deleteContestGroupMatchResolver: Resolver = async (
  _: any,
  { id }: { id: string }
) => {
  await client.contestMatchGroup.delete({
    where: {
      id,
    },
  });

  return {
    ok: true,
  };
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteContestGroupMatch: deleteContestGroupMatchResolver,
  },
};

export default resolvers;
