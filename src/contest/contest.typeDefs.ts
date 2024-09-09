import { gql } from "graphql-tag";

export default gql`
  type Contest {
    id: String
    contestId: String
    contestName: String
    contestStartDate: String
    contestEndDate: String
    contestRecruitStart: String
    contestRecruitEnd: String
    contestPlace: String
    buildingNumber: String
    dongEubMyunName: String
    gusiName: String
    riName: String
    roadName: String
    sidoName: String
    zipcode: String
    areaLatitude: String
    areaLongtitude: String
    contestPlaceAddress: String
    contestStadium: String
    contestHost: String
    contestSponsorShip: String
    contestSports: String
    contestSportsDetail: String
    contestDiscription: String
    contestTerms: String
    contestAwardDetails: String
    contestEntryFee: String
    contestStatus: String
    contestPaymentMethod: String
    contestRecruitNumber: Int
    contestUserCount: Int
    createdAt: String
    updatedAt: String
    contestBanner: String
    contestUser: [ContestUser]
    contestNotice: [ContestNotice]
    contestReport: [ContestReport]
    contestTierGroup: [ContestTierGroup]
    contestMatchGroup: [ContestMatchGroup]
    contestMatchGroupResult: [ContestGroupMatchResult]
    contestTournamentGroup: [ContestTournamentGroup]
    contestGroupMatchHistory: [ContestGroupMatchHistory]
    contestTournamentHistory: [ContestTournamentHistory]
    contestCourt: [ContestCourt]
  }

  type ContestUser {
    id: String
    contest: Contest
    user: User
    userAge: Int
    userGender: String
    userTier: String
    contestSports: String
    contestSportsType: String
    contestPaymentId: String
    contestPaymentStatus: String
    contestTeam: ContestTeam
    contestTierGroup: ContestTierGroup
    createdAt: String
    updatedAt: String
  }

  type ContestTeam {
    id: String
    teamName: String
    contestId: String
    contest: Contest
    contestUser: [ContestUser]
    contestTierGroupId: String
    contestTierGroup: ContestTierGroup
    contestMatchGroupId: String
    contestMatchGroup: ContestMatchGroup
    contestTournamentGroup: ContestTournamentGroup
    contestGroupMatchHistory: [ContestGroupMatchHistory]
    contestGroupMatchResult: [ContestGroupMatchResult]
    contestUserCount: Int
    createdAt: String
    updatedAt: String
  }

  type ContestTierGroup {
    id: String
    groupName: String
    roundAdvance: Int
    startRound: Int
    createMatchYN: Boolean
    contestId: String
    contest: Contest
    contestUser: [ContestUser]
    contestTeam: [ContestTeam]
    contestMatchGroup: [ContestMatchGroup]
    contestTournamentGroup: [ContestTournamentGroup]
    createdAt: String
    updatedAt: String
  }

  type ContestCourt {
    id: String
    courtName: String
    contestId: String
    contest: Contest
    contestGroupMatchHistory: [ContestGroupMatchHistory]
    contestTournamentHistory: [ContestTournamentHistory]
    createdAt: String
    updatedAt: String
  }

  type ContestMatchGroup {
    id: String
    groupNo: Int
    contest: Contest
    contestTierGroup: ContestTierGroup
    contestTeam: [ContestTeam]
    contestGroupMatchHistory: [ContestGroupMatchHistory]
    contestGroupMatchResult: [ContestGroupMatchResult]
    createdAt: String
    updatedAt: String
  }

  type ContestGroupMatchResult {
    id: String
    contest: Contest
    contestMatchGroup: ContestMatchGroup
    contestTeam: ContestTeam
    totalWin: Int
    totalLose: Int
    totalWinScore: Int
    totalLoseScore: Int
    totalScore: Int
    createdAt: String
    updatedAt: String
  }

  type ContestGroupMatchHistory {
    id: String
    matchNo: Int
    contest: Contest
    contestTeamId: Int
    contestTeam: ContestTeam
    opponentTeamId: Int
    opponentTeam: ContestTeam
    contestMatchGroup: ContestMatchGroup
    contestGroupMatchResult: ContestGroupMatchResult
    contestCourtId: Int
    contestCourt: ContestCourt
    isWinner: Boolean
    resultScore: String
    winScore: Int
    loseScore: Int
    status: String
    matchTime: String
    matchTimeHour: String
    matchTimeMin: String
    createdAt: String
    updatedAt: String
  }

  type ContestTournamentGroup {
    id: String
    name: String
    nextMatchId: String
    matchNo: Int
    tournamentRoundText: String
    startTime: String
    startTimeHour: String
    startTimeMin: String
    state: String
    contest: Contest
    contestTierGroup: ContestTierGroup
    contestTeam: [ContestTeam]
    participants: [ContestTournamentHistory]
    createdAt: String
    updatedAt: String
  }

  type ContestTournamentHistory {
    id: String
    matchNo: Int
    contest: Contest
    name: String
    contestTeam: ContestTeam
    opponentTeamName: String
    opponentTeam: ContestTeam
    contestTournamentGroup: ContestTournamentGroup
    contestCourt: ContestCourt
    isWinner: Boolean
    resultText: Int
    loseScore: Int
    status: String
    createdAt: String
    updatedAt: String
  }

  type ContestNotice {
    id: String
    contest: Contest
    noticeTitle: String
    noticeDiscription: String
    createdAt: String
    updatedAt: String
  }

  type ContestReport {
    id: String
    contest: Contest
    reportType: String
    reportTitle: String
    reportDiscription: String
    createdAt: String
    updatedAt: String
  }
`;
