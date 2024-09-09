import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const updateContestTournamentEndResolver: Resolver = async (
  _,
  {
    id,
    contestId,
    contestMatchGroupId,
    contestTeamId,
    contestCourtId,
    nextMatchId,
    matchNo,
    startTimeHour,
    startTimeMin,
    opponentTeamId,
    contestTeamScore,
    opponentTeamScore,
    topPartyTeamId,
    bottomPartyTeamId,
    topPartyTeamName,
    bottomPartyTeamName,
  },
  { client }
) => {
  // 대회 토너먼트 그룹 상태를 "DONE"으로 업데이트
  await client.contestTournamentGroup.update({
    where: {
      id,
    },
    data: {
      state: "DONE",
    },
  });

  // 이긴 팀의 토너먼트 기록 업데이트
  await client.contestTournamentHistory.update({
    where: {
      id: contestTeamId,
    },
    data: {
      ...(contestCourtId && {
        contestCourt: {
          connect: {
            id: contestCourtId,
          },
        },
      }),
      isWinner: contestTeamScore > opponentTeamScore, // 승리 여부 설정
      resultText: contestTeamScore + "", // 결과 점수 텍스트
      loseScore: opponentTeamScore, // 상대 팀의 점수
      totalScore: `${contestTeamScore} : ${opponentTeamScore}`, // 전체 결과 점수
      status: "DONE", // 상태를 완료로 설정
    },
  });

  // 진 팀의 토너먼트 기록 업데이트
  await client.contestTournamentHistory.update({
    where: {
      id: opponentTeamId,
    },
    data: {
      ...(contestCourtId && {
        contestCourt: {
          connect: {
            id: contestCourtId,
          },
        },
      }),
      isWinner: opponentTeamScore > contestTeamScore, // 상대 팀의 승리 여부 설정
      resultText: opponentTeamScore + "", // 상대 팀의 결과 점수 텍스트
      loseScore: contestTeamScore, // 진 팀의 점수
      totalScore: `${opponentTeamScore} : ${contestTeamScore}`, // 전체 결과 점수
      status: "DONE", // 상태를 완료로 설정
    },
  });

  // 다음 경기에 참가할 팀 업데이트
  await client.contestTournamentGroup.update({
    where: {
      id: nextMatchId,
    },
    data: {
      matchNo, // 경기 번호
      ...(contestTeamScore > opponentTeamScore && {
        contestTeam: {
          connect: {
            id: topPartyTeamId,
          },
        },
      }),
      ...(contestTeamScore < opponentTeamScore && {
        contestTeam: {
          connect: {
            id: bottomPartyTeamId,
          },
        },
      }),
    },
  });

  // 다음 토너먼트 경기 기록 가져오기
  const nextTournament = await client.contestTournamentHistory.findMany({
    where: {
      contestTournamentGroupId: nextMatchId,
    },
    orderBy: [{ contestTeamId: "desc" }],
  });

  // 다음 토너먼트 경기를 업데이트
  nextTournament.map(async (next, index) => {
    if (index === 0) {
      await client.contestTournamentHistory.update({
        where: {
          id: next.id,
        },
        data: {
          ...(contestTeamScore > opponentTeamScore && {
            name: topPartyTeamName, // 상위 팀 이름
            contestTeam: {
              connect: {
                id: topPartyTeamId,
              },
            },
          }),
          ...(contestTeamScore < opponentTeamScore && {
            name: bottomPartyTeamName, // 하위 팀 이름
            contestTeam: {
              connect: {
                id: bottomPartyTeamId,
              },
            },
          }),
        },
      });
    } else if (index === 1) {
      await client.contestTournamentHistory.update({
        where: {
          id: next.id,
        },
        data: {
          ...(contestTeamScore > opponentTeamScore && {
            opponentTeam: {
              connect: {
                id: topPartyTeamId,
              },
            },
          }),
          ...(contestTeamScore < opponentTeamScore && {
            opponentTeam: {
              connect: {
                id: bottomPartyTeamId,
              },
            },
          }),
        },
      });
    }
  });

  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    updateContestTournamentEnd: updateContestTournamentEndResolver,
  },
};

export default resolvers;
