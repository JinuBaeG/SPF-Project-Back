import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestGroupByCourt(contestCourtId: String): [ContestGroupMatchHistory]
  }
`;
