import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeNoticeComment(id: String): NoticeComment
  }
`;
