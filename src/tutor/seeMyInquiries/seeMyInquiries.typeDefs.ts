import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeMyInquiries(offset: Int): [TutorInquiry]
  }
`;
