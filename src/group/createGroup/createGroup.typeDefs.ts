import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createGroup(file: Upload!, caption: String): Group
  }
`;
