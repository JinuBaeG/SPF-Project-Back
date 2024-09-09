import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    updateContestMatch(contestGroupId: String): MutationResponse
  }
`;
