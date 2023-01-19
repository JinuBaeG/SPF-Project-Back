import { gql } from "apollo-server-express";

export default gql`
  type Group {
    id: Int!
    name: String
    discription: String
    activeArea: String
    address: String
    addrRoad: String
    addAddr: String
    zipcode: String
    areaLatitude: String
    areaLongitude: String
    sportsEvent: String
    imagePath: String
    groupPresident: GroupPresident
    users: [User]
    userCount: Int
    maxMember: Int
    facility: [Facility]
    groupInfo: [GroupInfo]
    groupTag: [GroupTag]
    groupJoinRequest: [GroupJoinRequest]
    createdAt: String!
    updatedAt: String!
    isJoin: Boolean
    isJoining: Boolean
    isPresident: Boolean
  }

  type GroupPresident {
    id: Int!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type GroupInfo {
    id: Int!
    group: Group
    discription: String
    awardDate: String
    createdAt: String!
    updatedAt: String!
  }

  type GroupTag {
    id: Int!
    name: String
    isUse: Boolean
    isCustom: Boolean
    group: [Group]
    createdAt: String!
    updatedAt: String!
  }

  type GroupJoinRequest {
    id: Int!
    group: Group
    user: User
    createdAt: String!
    updatedAt: String!
  }
`;
