import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createNotice(
      id: String
      title: String
      discription: String
      sortation: String
    ): Notice
  }
`;
