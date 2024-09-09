import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteNoticeReComment(id: String!): MutationResponse!
  }
`;
