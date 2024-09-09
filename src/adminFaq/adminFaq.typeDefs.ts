import { gql } from "graphql-tag";

export default gql`
  type AdminFaq {
    id: String
    title: String
    discription: String
    createdAt: String
    updatedAt: String
  }

  # 추가된 Query 타입
  type Query {
    adminFaqs: [AdminFaq]
    adminFaq(id: String!): AdminFaq
  }
`;
