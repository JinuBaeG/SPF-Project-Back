import { gql } from "graphql-tag";

export default gql`
  type Comment {
    id: String!
    user: User!
    photo: Photo!
    payload: String!
    isMine: Boolean!
    reComments: [ReComment]
    reCommentCount: Int
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    comments: [Comment]
    comment(id: String!): Comment
  }
`;
