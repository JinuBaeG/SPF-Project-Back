import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateContestJoinStatus(
      contestPaymentId: String
      status: String
    ): MutationResponse
  }
`;
