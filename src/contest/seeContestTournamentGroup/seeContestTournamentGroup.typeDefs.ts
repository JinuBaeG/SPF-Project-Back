import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestTournamentGroup(contestGroupId: String): [ContestTournamentGroup]
  }
`;
