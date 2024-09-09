import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    requestAddFacility(title: String!, discription: String!): MutationResponse
  }
`;
