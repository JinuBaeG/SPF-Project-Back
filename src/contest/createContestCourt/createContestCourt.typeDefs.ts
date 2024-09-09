import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createContestCourt(courtName: String, contestId: String): MutationResponse
  }
`;
