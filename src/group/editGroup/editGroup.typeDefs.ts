import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editGroup(
      id: String
      name: String!
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
      areaLatitude: String
      areaLongitude: String
      sportsEvent: String
      file: [Upload]
      maxMember: String
      groupInfo: [GroupInfoInput]
      groupTag: [GroupTagInput]
      groupPresident: GroupPresidentInput
    ): MutationResponse!
  }

  input GroupInfoInput {
    id: String
    discription: String
    awardDate: String
    isNew: Boolean
    isDelete: Boolean
  }

  input GroupTagInput {
    id: String
    name: String
    isUse: Boolean
  }

  input GroupPresidentInput {
    id: String
    user: UserInput
  }

  input UserInput {
    id: String
    username: String
  }
`;
