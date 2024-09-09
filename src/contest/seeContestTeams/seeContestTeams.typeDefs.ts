import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestTeams(contestId: String): [ContestTeam]
  }
`;
