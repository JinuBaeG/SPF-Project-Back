import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestJoinCheck(contestId: String, userId: String): JoinContestUser
  }

  type JoinContestUser {
    id: String
    contest: Contest
    phoneNumber: String
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
`;
