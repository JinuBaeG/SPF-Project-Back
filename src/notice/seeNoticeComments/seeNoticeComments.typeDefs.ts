import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeNoticeComments(id: String!, offset: Int): [NoticeComment]
  }
`;
