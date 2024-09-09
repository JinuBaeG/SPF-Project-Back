import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAdminFaq(id: String): AdminFaq
  }
`;
