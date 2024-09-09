import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    blockUser(id: String): MutationResponse
  }
`;
