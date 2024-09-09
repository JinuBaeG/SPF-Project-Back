import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editAdminNotice(
      id: String
      title: String
      discription: String
    ): MutationResponse
  }
`;
