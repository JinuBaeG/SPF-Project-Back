import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    decryptPhoneNumber(phoneNumber: String): DecryptPhoneNumber
  }

  type DecryptPhoneNumber {
    ok: Boolean
    phoneNumber: String
  }
`;
