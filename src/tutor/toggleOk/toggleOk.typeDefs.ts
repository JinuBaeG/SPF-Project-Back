import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    toggleOk(id: String!): MutationResponse!
  }
`;
