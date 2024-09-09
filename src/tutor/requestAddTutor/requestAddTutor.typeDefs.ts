import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    requestAddTutor(title: String!, discription: String!): MutationResponse
  }
`;
