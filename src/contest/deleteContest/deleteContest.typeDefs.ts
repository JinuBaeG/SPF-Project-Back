import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteContest(ids: [ContestIds]): MutationResponse
  }

  input ContestIds {
    contestId: String
  }
`;
