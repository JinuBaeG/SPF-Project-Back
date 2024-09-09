import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteFacility(id: String): MutationResponse
  }
`;
