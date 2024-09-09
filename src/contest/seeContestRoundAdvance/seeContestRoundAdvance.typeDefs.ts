import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestRoundAdvance(
      contestGroupId: String
      roundAdvance: Int
    ): [ContestMatchGroup]
  }
`;
