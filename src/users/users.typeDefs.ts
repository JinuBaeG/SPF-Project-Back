import { gql } from "graphql-tag";

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    avatar: String
    gender: String
    googleConnect: Boolean
    googleID: String
    kakaoConnect: Boolean
    kakaoID: String
    naverConnect: Boolean
    naverID: String
    appleConnect: Boolean
    appleID: String
    phoneNumber: String
    privacyAccess: Boolean
    usertermAccess: Boolean
    locationAccess: Boolean
    photos: [Photo]
    group: [Group]
    tutor: [Tutor]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    groupCount: Int!
    tutorCount: Int!
    board: [Board]
    notice: [Notice]
    gallery: [Gallery]
    blockUser: [BlockUser]
    blockedBy: [BlockUser]
  }

  type BlockUser {
    id: String
    user: User
    blockedBy: User
    createdAt: String
    updatedAt: String
  }

  # 최소한의 Query 타입 추가
  type Query {
    users: [User]
    user(id: String!): User
  }
`;
