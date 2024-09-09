import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createNoticeComment(noticeId: String!, payload: String!): MutationResponse!
  }
`;
