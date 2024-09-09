import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createContestNotice(
      contestId: String
      noticeTitle: String
      noticeDiscription: String
    ): MutationResponse
  }
`;
