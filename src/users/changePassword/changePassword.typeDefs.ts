import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    changePassword(id: String!, password: String!): MutationResponse
  }
`;
