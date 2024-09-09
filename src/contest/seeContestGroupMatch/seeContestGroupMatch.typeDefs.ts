import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestGroupMatch(contestGroupId: String): [ContestMatchGroup]
  }
`;
