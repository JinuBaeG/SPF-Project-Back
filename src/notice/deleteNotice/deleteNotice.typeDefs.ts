import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteNotice(id: String!): MutationResponse!
  }
`;
