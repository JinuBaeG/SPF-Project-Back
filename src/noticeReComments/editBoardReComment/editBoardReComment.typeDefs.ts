import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editNoticeReComment(id: String!, payload: String!): MutationResponse!
  }
`;
