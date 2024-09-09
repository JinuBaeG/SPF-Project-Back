import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// 대회 토너먼트 설정을 업데이트하는 함수
const updateContestTournamentSettingResolver: Resolver = async (
  _,
  {
    contestId,          // 대회 ID
    id,                 // 토너먼트 그룹 ID
    contestTeamId,      // 팀 ID
    contestCourtId,     // 경기장 ID
    matchNo,            // 경기 번호
    startTimeHour,      // 경기 시작 시간(시)
    startTimeMin,       // 경기 시작 시간(분)
    opponentTeamId,     // 상대 팀 ID
    contestTeamScore,   // 팀 점수
    opponentTeamScore,  // 상대 팀 점수
  }
) => {
  // 팀의 토너먼트 기록 업데이트
  await client.contestTournamentHistory.update({
    where: {
      id: contestTeamId,  // 팀 ID로 검색
    },
    data: {
      ...(contestCourtId !== undefined &&
        contestCourtId !== null && {
          contestCourt: {
            connect: {
              id: contestCourtId,  // 경기장 ID 연결
            },
          },
        }),
      resultText: contestTeamScore + "",  // 팀 점수 설정
      loseScore: opponentTeamScore,      // 상대 팀 점수 설정
      totalScore: contestTeamScore + " : " + opponentTeamScore,  // 총 점수 설정
    },
  });

  // 토너먼트 그룹 업데이트
  await client.contestTournamentGroup.update({
    where: {
      id,  // 토너먼트 그룹 ID로 검색
    },
    data: {
      matchNo,  // 경기 번호 설정
      startTime: startTimeHour + ":" + startTimeMin,  // 경기 시작 시간 설정
      startTimeHour: startTimeHour + "",  // 시작 시간(시) 설정
      startTimeMin: startTimeMin + "",    // 시작 시간(분) 설정
    },
  });

  // 상대 팀의 토너먼트 기록 업데이트
  await client.contestTournamentHistory.update({
    where: {
      id: opponentTeamId,  // 상대 팀 ID로 검색
    },
    data: {
      ...(contestCourtId !== undefined &&
        contestCourtId !== null && {
          contestCourt: {
            connect: {
              id: contestCourtId,  // 경기장 ID 연결
            },
          },
        }),
      resultText: opponentTeamScore + "",  // 상대 팀 점수 설정
      loseScore: contestTeamScore,         // 팀 점수 설정
      totalScore: opponentTeamScore + " : " + contestTeamScore,  // 총 점수 설정
    },
  });

  return {
    ok: true,  // 업데이트 성공 응답
  };
};

// resolver와 resolvers 구조
const resolvers: Resolvers = {
  Mutation: {
    updateContestTournamentSetting: updateContestTournamentSettingResolver,
  },
};

export default resolvers;
