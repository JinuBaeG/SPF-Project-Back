import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAdminNotices(offset: Int): [AdminNotice]
  }
`;
