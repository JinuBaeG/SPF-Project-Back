import { gql } from "graphql-tag";

export default gql`
  type Notice {
    id: String
    user: User!
    group: Group
    tutor: Tutor
    title: String
    discription: String
    sortation: String
    likes: Int!
    hits: Int!
    isMine: Boolean!
    isLiked: Boolean!
    noticeCommentCount: Int!
    noticeComments: [NoticeComment]
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    notices: [Notice]
    notice(id: String!): Notice
  }
`;
