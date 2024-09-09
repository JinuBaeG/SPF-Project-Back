import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteContestGroupMatch(id: String): MutationResponse
  }
`;
