import { gql } from "graphql-tag";

export default gql`
  type BoardReComment {
    id: String!
    user: User!
    boardComment: BoardComment!
    payload: String!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    boardReComments: [BoardReComment]
    boardReComment(id: String!): BoardReComment
  }
`;
