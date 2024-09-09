import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    findTeam(contestId: String, teamName: String): FindTeamResult
  }

  type FindTeamResult {
    ok: Boolean
    info: String
    contestTeamId: String
  }
`;
