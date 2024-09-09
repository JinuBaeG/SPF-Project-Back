import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    sendMessage(
      payload: String!
      roomId: String
      userId: String
    ): MutationResponse!
  }
`;
