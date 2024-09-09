import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createTutor(
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
      tutorSportsEvent: [TutorSportsEventInput]
      file: [Upload]
      tutorInfo: [TutorInfoInput]
      tutorTag: [TutorTagInput]
      group: [GroupInput]
    ): MutationResponse!
  }

  input GroupInput {
    id: String!
    name: String
    addrRoad: String
    sportsEvent: String
  }

  input TutorSportsEventInput {
    id: String
    name: String
    imagePath: String
    isChecked: Boolean
  }

  input TutorInfoInput {
    discription: String
    awardDate: String
    isNew: Boolean
    isDelete: Boolean
  }

  input TutorTagInput {
    id: String
    name: String
    isUse: Boolean
  }
`;
