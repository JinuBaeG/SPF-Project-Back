import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeMyReports(offset: Int): [Report]
  }
`;
