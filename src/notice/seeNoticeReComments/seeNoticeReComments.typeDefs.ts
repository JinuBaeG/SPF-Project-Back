import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeNoticeReComments(id: String!, offset: Int): [NoticeReComment]
  }
`;
