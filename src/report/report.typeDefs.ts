import { gql } from "graphql-tag";

export default gql`
  type Report {
    id: Int
    userId: Int
    user: User
    photoId: Int
    photo: Photo
    boardId: Int
    board: Board
    noticeId: Int
    notice: Notice
    reportDiscription: String
    reportSortation: String
    createdAt: String
    updatedAt: String
  }

  # 추가된 Query 타입
  type Query {
    reports: [Report]
    report(id: Int!): Report
  }
`;
