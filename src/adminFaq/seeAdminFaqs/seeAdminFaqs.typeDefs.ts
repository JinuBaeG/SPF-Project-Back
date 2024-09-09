import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeAdminFaqs(offset: Int): [AdminFaq]
  }
`;
