import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// 대회 토너먼트를 시작하는 함수
const updateContestTournamentStartResolver: Resolver = async (
  _,
  { id, contestTeamId, opponentTeamId }
) => {
  
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();

  // 토너먼트 그룹의 시작 시간을 업데이트
  await client.contestTournamentGroup.update({
    where: {
      id,
    },
    data: {
      startTime: hour + ":" + min,  // 경기 시작 시간 설정
      startTimeHour: hour + "",     // 시작 시간(시)
      startTimeMin: min + "",       // 시작 시간(분)
    },
  });

  // 팀의 토너먼트 기록 업데이트
  await client.contestTournamentHistory.update({
    where: {
      id: contestTeamId,  // 팀 ID로 검색
    },
    data: {
      status: "SCORE_DONE",  // 상태를 완료로 업데이트
    },
  });

  // 상대 팀의 토너먼트 기록 업데이트
  await client.contestTournamentHistory.update({
    where: {
      id: opponentTeamId,  // 상대 팀 ID로 검색
    },
    data: {
      status: "SCORE_DONE",  // 상태를 완료로 업데이트
    },
  });

  return {
    ok: true,  // 업데이트 성공 응답
  };
};

// resolvers 구조 정의
const resolvers: Resolvers = {
  Mutation: {
    updateContestTournamentStart: updateContestTournamentStartResolver,
  },
};

export default resolvers;
