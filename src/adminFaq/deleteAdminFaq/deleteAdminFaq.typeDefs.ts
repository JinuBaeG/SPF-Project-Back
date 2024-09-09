import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteAdminFaq(id: String): MutationResponse
  }
`;
