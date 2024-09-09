import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteBugReport(id: String): MutationResponse
  }
`;
