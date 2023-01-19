import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeTag(offset: Int): [Tag]
  }
`;
