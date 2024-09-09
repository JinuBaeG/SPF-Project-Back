import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestGroupMatchSchedule(
      contestMatchGroupId: String
    ): [ContestGroupMatchHistory]
  }
`;
