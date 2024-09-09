import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeReComments(id: String!, offset: Int): [ReComment]
  }
`;
