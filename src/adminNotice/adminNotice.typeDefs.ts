import { gql } from "graphql-tag";

export default gql`
  type AdminNotice {
    id: String
    title: String
    discription: String
    createdAt: String
    updatedAt: String
  }

  # 추가된 Query 타입
  type Query {
    adminNotices: [AdminNotice]
    adminNotice(id: String!): AdminNotice
  }
`;
