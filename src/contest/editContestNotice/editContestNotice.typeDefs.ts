import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editContestNotice(
      id: String
      contestId: String
      noticeTitle: String
      noticeDiscription: String
    ): MutationResponse
  }
`;
