import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    withdrawGroup(id: String!): MutationResponse!
  }
`;
