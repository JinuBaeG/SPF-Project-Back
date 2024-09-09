import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    responseInquiry(
      id: String
      tutorId: String
      userId: String
      title: String
      discription: String
    ): TutorInquiry
  }
`;
