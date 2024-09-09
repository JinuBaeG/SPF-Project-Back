import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    addFeedCategory(sortKey: Int, name: String): MutationResponse
  }
`;
