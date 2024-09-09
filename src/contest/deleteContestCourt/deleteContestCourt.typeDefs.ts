import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteContestCourt(ids: [DeleteCourtIds]): MutationResponse
  }

  input DeleteCourtIds {
    id: String
  }
`;
