import { gql } from "graphql-tag";

export default gql`
  type BugReport {
    id: String
    user: User
    reportTitle: String
    reportDiscription: String
    reportImage: [BugReportImage]
    createdAt: String
    updatedAt: String
  }

  type BugReportImage {
    id: String
    bugReport: BugReport
    imagePath: String
    createdAt: String
    updatedAt: String
  }

  # 추가된 Query 타입
  type Query {
    bugReports: [BugReport]
    bugReport(id: String!): BugReport
  }
`;
