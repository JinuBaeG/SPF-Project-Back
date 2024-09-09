import { gql } from "graphql-tag";

export default gql`
  type NoticeComment {
    id: String!
    user: User!
    notice: Notice!
    payload: String!
    isMine: Boolean!
    noticeReComments: [NoticeReComment]
    noticeReCommentCount: Int
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    noticeComments: [NoticeComment]
    noticeComment(id: String!): NoticeComment
  }
`;
