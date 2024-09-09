import { gql } from "graphql-tag";

export default gql`
  type Config {
    id: String
    privacyTerms: String
    gpsTerms: String
    useTerms: String
    businessInfo: String
    createdAt: String
    updatedAt: String
  }

  # 추가된 Query 타입
  type Query {
    configs: [Config]
    config(id: String!): Config
  }
`;
