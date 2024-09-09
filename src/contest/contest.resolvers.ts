import client from "../client";
import { Resolver, Resolvers } from "../types";

// Contest 관련 resolver 정의
const contestResolvers: Resolvers = {
  Contest: {
    // 대회 참가자 수 계산
    contestUserCount: ({ contestId }) => {
      return client.contestUser.count({
        where: {
          contestId,
        },
      });
    },
    // 대회 참가자 목록
    contestUser: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestUser();
    },
    // 대회 공지 사항
    contestNotice: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestNotice();
    },
    // 대회 리포트
    contestReport: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestReport();
    },
    // 대회 티어 그룹
    contestTierGroup: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestTierGroup();
    },
    // 대회 매치 그룹
    contestMatchGroup: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestMatchGroup();
    },
    // 대회 토너먼트 그룹
    contestTournamentGroup: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestTournamentGroup();
    },
    // 대회 그룹 매치 기록
    contestGroupMatchHistory: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestGroupMatchHistory();
    },
    // 대회 토너먼트 기록
    contestTournamentHistory: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestTournamentHistory();
    },
    // 대회 경기장
    contestCourt: ({ id }) => {
      return client.contest.findUnique({
        where: {
          id,
        },
      }).contestCourt();
    },
  },
  ContestTeam: {
    // 팀의 참가자 수 계산
    contestUserCount: ({ id }) => {
      return client.contestUser.count({
        where: {
          contestTeam: { id },
        },
      });
    },
  },
  ContestUser: {
    // 참가자 정보 조회
    user: ({ userId }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
  },
  ContestMatchGroup: {
    // 매치 그룹에 속한 팀 정보 조회
    contestTeam: ({ id }) => {
      return client.contestTeam.findMany({
        where: {
          contestMatchGroup: {
            id,
          },
        },
        include: {
          contestUser: true,
          contestGroupMatchResult: true,
        },
      });
    },
  },
  ContestGroupMatchHistory: {
    // 대회 정보 조회
    contest: ({ contestId }) => {
      return client.contest.findUnique({
        where: {
          contestId,
        },
      });
    },
    // 팀 정보 조회
    contestTeam: ({ contestTeamId }) => {
      return client.contestTeam.findUnique({
        where: {
          id: contestTeamId,
        },
        include: {
          contestUser: true,
        },
      });
    },
    // 상대 팀 정보 조회
    opponentTeam: ({ opponentTeamId }) => {
      return client.contestTeam.findUnique({
        where: {
          id: opponentTeamId,
        },
        include: {
          contestUser: true,
        },
      });
    },
  },
  ContestGroupMatchResult: {
    // 매치 결과의 팀 정보 조회
    contestTeam: ({ contestTeamId }) => {
      return client.contestTeam.findUnique({
        where: {
          id: contestTeamId,
        },
        include: {
          contestUser: true,
        },
      });
    },
  },
};

export default contestResolvers;
