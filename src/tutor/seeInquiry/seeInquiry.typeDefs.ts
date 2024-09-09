import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeInquiry(id: String): TutorInquiry
  }
`;
