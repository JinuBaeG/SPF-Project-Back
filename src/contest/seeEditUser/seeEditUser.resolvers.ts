import { Resolver, Resolvers } from "../../types";
import client from "../../client";
import { deCryptFunction } from "../../users/users.utils";

const seeEditContestUserResolver: Resolver = async (
  _,
  { id }: { id: string }
) => {
  try {
    const contestUser = await client.contestUser.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        contestTeam: true,
        contest: true,
      },
    });

    if (!contestUser) {
      return {
        ok: false,
        error: "대회 참가자를 찾을 수 없습니다.",
      };
    }

    if (contestUser.user && contestUser.user.phoneNumber) {
      contestUser.user.phoneNumber = deCryptFunction(contestUser.user.phoneNumber);
    }

    return {
      ok: true,
      contestUser,
    };
  } catch (error) {
    return {
      ok: false,
      error: "대회 참가자 정보를 가져오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeEditContestUser: seeEditContestUserResolver,
  },
};

export default resolvers;
