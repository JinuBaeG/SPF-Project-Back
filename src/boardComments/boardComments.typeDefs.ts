import { gql } from "graphql-tag";

export default gql`
  type BoardComment {
    id: String!
    user: User!
    board: Board!
    payload: String!
    isMine: Boolean!
    boardReComments: [BoardReComment]
    boardReCommentCount: Int
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    boardComments: [BoardComment]
    boardComment(id: String!): BoardComment
  }
`;
