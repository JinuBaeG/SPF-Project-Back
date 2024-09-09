import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    loginCheck(
      uid: String
      token: String
      email: String
      interlock: String
    ): LoginCheck
  }

  type LoginCheck {
    ok: Boolean
    token: String
    uid: String
    email: String
    interlock: String
  }
`;
