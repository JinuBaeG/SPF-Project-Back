import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    checkPhone(phoneNumber: String): MutationResponse
  }
`;
