import { gql } from "graphql-tag";

export default gql`
  type Query {
    checkMyRequest(offset: Int): [RequestAddTutor]
  }
`;
