import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteReport(id: String): MutationResponse
  }
`;
