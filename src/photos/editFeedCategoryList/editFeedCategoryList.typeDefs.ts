import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editFeedCategory(id: String, name: String, sortKey: Int): MutationResponse
  }
`;
