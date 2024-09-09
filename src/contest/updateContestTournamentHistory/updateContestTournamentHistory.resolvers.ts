import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// 대회 토너먼트 기록을 업데이트하는 함수
const updateContestTournamentHistoryResolver: Resolver = async (
  _,
  {
    contestTournamentGroupId,  // 토너먼트 그룹 ID
    contestTeamHistoryId,      // 팀의 토너먼트 기록 ID
    opponentTeamHistoryId,     // 상대 팀의 토너먼트 기록 ID
    contestTeamId,             // 팀 ID
    contestTeamName,           // 팀 이름
    groupTierId,               // 그룹 티어 ID
    contestId,                 // 대회 ID
  }
) => {
  // 팀의 토너먼트 기록을 업데이트
  await client.contestTournamentHistory.update({
    where: {
      id: contestTeamHistoryId,  // 팀 기록 ID로 검색
    },
    data: {
      contestTournamentGroup: {
        connect: {
          id: contestTournamentGroupId,  // 토너먼트 그룹 ID 연결
        },
      },
      contestTeam: {
        connect: {
          id: contestTeamId,  // 팀 ID 연결
        },
      },
      name: contestTeamName,  // 팀 이름 설정
    },
  });

  // 상대 팀의 토너먼트 기록을 업데이트
  await client.contestTournamentHistory.update({
    where: {
      id: opponentTeamHistoryId,  // 상대 팀 기록 ID로 검색
    },
    data: {
      contestTournamentGroup: {
        connect: {
          id: contestTournamentGroupId,  // 토너먼트 그룹 ID 연결
        },
      },
      opponentTeam: {
        connect: {
          id: contestTeamId,  // 상대 팀 ID 연결
        },
      },
    },
  });

  // 토너먼트 그룹에서 해당 팀을 연결
  await client.contestTournamentGroup.update({
    where: {
      id: contestTournamentGroupId,  // 토너먼트 그룹 ID로 검색
    },
    data: {
      contestTeam: {
        connect: {
          id: contestTeamId,  // 팀 ID 연결
        },
      },
    },
  });

  return {
    ok: true,  // 업데이트 성공 응답
  };
};

// resolver와 resolvers 구조
const resolvers: Resolvers = {
  Mutation: {
    updateContestTournamentHistory: updateContestTournamentHistoryResolver,
  },
};

export default resolvers;
