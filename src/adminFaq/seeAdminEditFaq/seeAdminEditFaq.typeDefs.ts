import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAdminEditFaq(id: String): AdminFaq
  }
`;
