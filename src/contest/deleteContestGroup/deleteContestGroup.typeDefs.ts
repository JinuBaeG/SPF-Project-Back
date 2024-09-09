import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteContestGroup(ids: [ContestGroupIds]): MutationResponse
  }

  input ContestGroupIds {
    id: String
  }
`;
