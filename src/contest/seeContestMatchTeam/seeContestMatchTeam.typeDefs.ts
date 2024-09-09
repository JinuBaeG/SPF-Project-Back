import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestMatchTeam(contestMatchGroupId: String): [ContestTeam]
  }
`;
