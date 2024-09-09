import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestReport(id: String): ContestNotice
  }
`;
