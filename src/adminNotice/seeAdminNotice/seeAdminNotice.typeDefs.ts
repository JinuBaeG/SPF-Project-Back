import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAdminNotice(id: String): AdminNotice
  }
`;
