import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editAdminFaq(
      id: String
      title: String
      discription: String
    ): MutationResponse
  }
`;
