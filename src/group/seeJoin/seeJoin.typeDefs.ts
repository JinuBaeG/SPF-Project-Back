import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeJoin(groupId: String!): [GroupJoinRequest]
  }
`;
