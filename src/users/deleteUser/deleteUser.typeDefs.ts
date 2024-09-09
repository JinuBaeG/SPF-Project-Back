import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteUser(password: String): MutationResponse
  }
`;
