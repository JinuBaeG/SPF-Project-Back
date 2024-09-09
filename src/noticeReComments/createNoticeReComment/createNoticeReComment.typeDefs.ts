import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createNoticeReComment(
      noticeCommentId: String!
      payload: String!
    ): MutationResponse!
  }
`;
