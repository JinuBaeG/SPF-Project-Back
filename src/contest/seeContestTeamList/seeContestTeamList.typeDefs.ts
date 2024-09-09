import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestTeamList(contestId: String): [ContestTeam]
  }
`;
