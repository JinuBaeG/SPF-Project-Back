import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeContestNotice(id: String): ContestNotice
  }
`;
