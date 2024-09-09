import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    joinDenied(id: String!, groupId: String!): MutationResponse!
  }
`;
