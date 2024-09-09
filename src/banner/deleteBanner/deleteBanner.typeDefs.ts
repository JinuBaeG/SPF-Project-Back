import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteBanner(id: String): MutationResponse
  }
`;
