import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const updateContestGroupEndResolver: Resolver = async (
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
  // 첫 번째 팀의 경기 기록 업데이트
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
      isWinner: contestTeamScore > opponentTeamScore,
      winScore: contestTeamScore,
      loseScore: opponentTeamScore,
      resultScore: `${contestTeamScore} : ${opponentTeamScore}`,
      status: "DONE",
    },
  });

  // 첫 번째 팀의 경기 결과를 확인하고 업데이트
  const contestTeamResult = await client.contestGroupMatchResult.findUnique({
    where: {
      contestMatchGroupId_contestTeamId: {
        contestMatchGroupId,
        contestTeamId,
      },
    },
  });

  if (contestTeamResult) {
    await client.contestGroupMatchResult.update({
      where: {
        contestMatchGroupId_contestTeamId: {
          contestMatchGroupId,
          contestTeamId,
        },
      },
      data: {
        totalWin:
          contestTeamScore > opponentTeamScore
            ? (contestTeamResult.totalWin ?? 0) + 1
            : contestTeamResult.totalWin ?? 0,
        totalLose:
          contestTeamScore < opponentTeamScore
            ? (contestTeamResult.totalLose ?? 0) + 1
            : contestTeamResult.totalLose ?? 0,
        totalWinScore: (contestTeamResult.totalWinScore ?? 0) + contestTeamScore,
        totalLoseScore:
          (contestTeamResult.totalLoseScore ?? 0) + opponentTeamScore,
        totalScore:
          (contestTeamResult.totalScore ?? 0) +
          (contestTeamScore - opponentTeamScore),
      },
    });
  }

  // 두 번째 팀의 경기 기록 업데이트
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
      isWinner: opponentTeamScore > contestTeamScore,
      winScore: opponentTeamScore,
      loseScore: contestTeamScore,
      resultScore: `${opponentTeamScore} : ${contestTeamScore}`,
      status: "DONE",
    },
  });

  // 두 번째 팀의 경기 결과를 확인하고 업데이트
  const opponentTeamResult = await client.contestGroupMatchResult.findUnique({
    where: {
      contestMatchGroupId_contestTeamId: {
        contestMatchGroupId,
        contestTeamId: opponentTeamId,
      },
    },
  });

  if (opponentTeamResult) {
    await client.contestGroupMatchResult.update({
      where: {
        contestMatchGroupId_contestTeamId: {
          contestMatchGroupId,
          contestTeamId: opponentTeamId,
        },
      },
      data: {
        totalWin:
          opponentTeamScore > contestTeamScore
            ? (opponentTeamResult.totalWin ?? 0) + 1
            : opponentTeamResult.totalWin ?? 0,
        totalLose:
          opponentTeamScore < contestTeamScore
            ? (opponentTeamResult.totalLose ?? 0) + 1
            : opponentTeamResult.totalLose ?? 0,
        totalWinScore: (opponentTeamResult.totalWinScore ?? 0) + opponentTeamScore,
        totalLoseScore:
          (opponentTeamResult.totalLoseScore ?? 0) + contestTeamScore,
        totalScore:
          (opponentTeamResult.totalScore ?? 0) +
          (opponentTeamScore - contestTeamScore),
      },
    });
  }

  return {
    ok: true,
  };
};

// 전체 resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    updateContestGroupEnd: updateContestGroupEndResolver,
  },
};

export default resolvers;
