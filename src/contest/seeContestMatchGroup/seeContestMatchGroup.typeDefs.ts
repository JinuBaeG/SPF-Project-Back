import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestMatchGroup(contestGroupId: String): [ContestMatchGroup]
  }
`;
