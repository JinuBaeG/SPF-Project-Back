import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteContestReport(id: String): MutationResponse
  }
`;
