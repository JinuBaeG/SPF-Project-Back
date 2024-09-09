import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createReport(
      photoId: String
      boardId: String
      noticeId: String
      reportDiscription: String
      reportSortation: String
    ): MutationResponse
  }
`;
