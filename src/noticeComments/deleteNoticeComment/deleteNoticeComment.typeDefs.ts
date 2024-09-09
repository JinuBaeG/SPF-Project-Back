import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteNoticeComment(id: String!): MutationResponse!
  }
`;
