import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeMyGroup(offset: Int!, sportsEvent: String): [MyGroup]
  }

  type MyGroup {
    id: String
    name: String
    groupImage: GroupImage
  }
`;
