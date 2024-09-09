import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    addInquiry(
      tutorId: String
      title: String
      discription: String
    ): TutorInquiry
  }
`;
