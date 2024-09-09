import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeGroups(offset: Int!, sportsEvent: String): [Group]
  }

  type GroupPresident {
    id: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;
