import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editPhoto(id: String!, caption: String!): MutationResponse!
  }
`;
