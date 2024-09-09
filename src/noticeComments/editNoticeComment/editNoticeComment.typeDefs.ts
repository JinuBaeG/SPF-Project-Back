import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editNoticeComment(id: String!, payload: String!): MutationResponse!
  }
`;
