import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestGroups(contestId: String): [ContestTierGroup]
  }
`;
