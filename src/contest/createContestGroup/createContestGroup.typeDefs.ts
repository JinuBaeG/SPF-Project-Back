import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createContestGroup(groupName: String, contestId: String): MutationResponse
  }
`;
