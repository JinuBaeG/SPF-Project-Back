import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeInquiries(id: String, offset: Int): [TutorInquiry]
  }
`;
