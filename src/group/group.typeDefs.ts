import { gql } from "graphql-tag";

export default gql`
  type Group {
    id: String!
    name: String
    discription: String
    sidoName: String
    gusiName: String
    dongEubMyunName: String
    riName: String
    roadName: String
    buildingNumber: String
    zipcode: String
    activeArea: String
    address: String
    addrRoad: String
    addAddr: String
    areaLatitude: String
    areaLongitude: String
    sportsEvent: String
    groupImage: GroupImage
    groupPresident: GroupPresident
    users: [User]
    userCount: Int
    maxMember: String
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

  type GroupImage {
    id: String!
    imagePath: String
    groupId: Group
    createdAt: String!
    updatedAt: String!
  }

  type GroupPresident {
    id: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type GroupInfo {
    id: String!
    group: Group
    discription: String
    awardDate: String
    createdAt: String!
    updatedAt: String!
  }

  type GroupTag {
    id: String!
    name: String
    imagePath: String
    group: [Group]
    createdAt: String!
    updatedAt: String!
  }

  type GroupJoinRequest {
    id: String
    group: Group
    user: User
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    groups: [Group]
    group(id: String!): Group
  }
`;
