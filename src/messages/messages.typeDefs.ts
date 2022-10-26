import { gql } from "apollo-server";

export default gql`
  type Messages {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
    createAt: String!
    updateAt: String!
  }

  type Room {
    id: Int!
    unreadTotal: Int!
    users: [User]
    messages: [Messages]
    createAt: String!
    updateAt: String!
  }
`;
