import { gql } from "graphql-tag";

export default gql`
  type Category {
    id: String
    name: String
    createdAt: String
    updatedAt: String
  }

  # 추가된 Query 타입
  type Query {
    categories: [Category]
    category(id: String!): Category
  }
`;
