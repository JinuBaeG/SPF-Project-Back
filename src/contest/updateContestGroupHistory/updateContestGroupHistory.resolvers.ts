import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const updateContestGroupHistoryResolver: Resolver = async (
  _,
  {
    contestId,
    contestMatchGroupId,
    contestTeamId,
    contestCourtId,
    matchNo,
    matchTimeHour,
    matchTimeMin,
    opponentTeamId,
    contestTeamScore,
    opponentTeamScore,
  },
  { client }
) => {
  // 첫 번째 팀의 기록 업데이트
  await client.contestGroupMatchHistory.update({
    where: {
      contestTeamId_opponentTeamId: {
        contestTeamId,
        opponentTeamId,
      },
    },
    data: {
      matchNo,
      ...(contestCourtId && {
        contestCourt: {
          connect: { id: contestCourtId },
        },
      }),
      matchTime: `${matchTimeHour}:${matchTimeMin}`,
      matchTimeHour,
      matchTimeMin,
      winScore: contestTeamScore,
      loseScore: opponentTeamScore,
      resultScore: `${contestTeamScore} : ${opponentTeamScore}`,
    },
  });

  // 두 번째 팀의 기록 업데이트
  await client.contestGroupMatchHistory.update({
    where: {
      contestTeamId_opponentTeamId: {
        contestTeamId: opponentTeamId,
        opponentTeamId: contestTeamId,
      },
    },
    data: {
      matchNo,
      ...(contestCourtId && {
        contestCourt: {
          connect: { id: contestCourtId },
        },
      }),
      matchTime: `${matchTimeHour}:${matchTimeMin}`,
      matchTimeHour,
      matchTimeMin,
      winScore: opponentTeamScore,
      loseScore: contestTeamScore,
      resultScore: `${opponentTeamScore} : ${contestTeamScore}`,
    },
  });

  return {
    ok: true,
  };
};

// 전체 resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    updateContestGroupHistory: updateContestGroupHistoryResolver,
  },
};

export default resolvers;
