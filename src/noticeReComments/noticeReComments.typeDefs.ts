import { gql } from "graphql-tag";

export default gql`
  type NoticeReComment {
    id: String!
    user: User!
    noticeComment: NoticeComment!
    payload: String!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    noticeReComments: [NoticeReComment]
    noticeReComment(id: String!): NoticeReComment
  }
`;
