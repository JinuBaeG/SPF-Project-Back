import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeTutor(id: String!): Tutor
  }
`;
