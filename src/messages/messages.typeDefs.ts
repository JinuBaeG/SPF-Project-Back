import { gql } from "graphql-tag";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Room {
    id: Int!
    unreadTotal: Int!
    users: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    messages: [Message]
    message(id: Int!): Message
    rooms: [Room]
    room(id: Int!): Room
  }
`;
