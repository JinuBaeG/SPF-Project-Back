import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    joinAccess(
      id: String!
      userId: String!
      groupId: String!
      username: String
    ): MutationResponse!
  }
`;
