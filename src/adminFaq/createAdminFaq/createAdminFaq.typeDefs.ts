import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createAdminFaq(title: String, discription: String): MutationResponse
  }
`;
