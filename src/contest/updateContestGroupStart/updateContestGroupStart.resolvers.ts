import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const updateContestGroupStartResolver: Resolver = async (
  _,
  { contestTeamId, opponentTeamId }
) => {
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();

  // 첫 번째 팀의 상태 업데이트
  await client.contestGroupMatchHistory.update({
    where: {
      contestTeamId_opponentTeamId: {
        contestTeamId,
        opponentTeamId,
      },
    },
    data: {
      status: "SCORE_DONE",
      matchTime: `${hour}:${min}`,
      matchTimeHour: hour.toString(),
      matchTimeMin: min.toString(),
    },
  });

  // 두 번째 팀의 상태 업데이트
  await client.contestGroupMatchHistory.update({
    where: {
      contestTeamId_opponentTeamId: {
        contestTeamId: opponentTeamId,
        opponentTeamId: contestTeamId,
      },
    },
    data: {
      status: "SCORE_DONE",
      matchTime: `${hour}:${min}`,
      matchTimeHour: hour.toString(),
      matchTimeMin: min.toString(),
    },
  });

  return {
    ok: true,
  };
};

// 전체 resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    updateContestGroupStart: updateContestGroupStartResolver,
  },
};

export default resolvers;
