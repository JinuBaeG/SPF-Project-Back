import { gql } from "graphql-tag";

export default gql`
  type ReComment {
    id: String!
    user: User!
    comment: Comment!
    payload: String!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    reComments: [ReComment]
    reComment(id: String!): ReComment
  }
`;
