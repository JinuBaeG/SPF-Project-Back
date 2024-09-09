import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createAdminNotice(title: String, discription: String): MutationResponse
  }
`;
