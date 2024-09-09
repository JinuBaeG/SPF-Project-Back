import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    deleteContestUser(ids: [DeleteContestUser]): MutationResponse
  }

  input DeleteContestUser {
    id: String
  }
`;
