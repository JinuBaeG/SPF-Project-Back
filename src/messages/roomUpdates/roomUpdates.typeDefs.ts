import { gql } from "graphql-tag";

export default gql`
  type Subscription {
    roomUpdates(id: String!): Message
  }
`;
