import { gql } from "graphql-tag";

export default gql`
  type Facility {
    id: String
    name: String
    discription: String
    sidoName: String
    gusiName: String
    dongEubMyunName: String
    riName: String
    roadName: String
    buildingNumber: Int
    zipcode: Int
    activeArea: String
    address: String
    addrRoad: String
    detailAddress: String
    areaLatitude: String
    areaLongitude: String
    operTime: String
    group: [Group]
    tutor: [Tutor]
    facilityImage: [FacilityImage]
    facilitySports: [FacilitySports]
    facilityInfo: [FacilityInfo]
    facilityTag: [FacilityTag]
    createdAt: String
    updatedAt: String
  }

  type FacilityImage {
    id: String!
    facilityId: Facility
    imagePath: String
    createdAt: String!
    updatedAt: String!
  }

  type FacilityInfo {
    id: String
    facility: [Facility]
    facilityId: Int
    discription: String
    awardDate: String
    createdAt: String
    updatedAt: String
  }

  type FacilityTag {
    id: String
    name: String
    imagePath: String
    isUse: Boolean
    isCustom: Boolean
    facility: [Facility]
    createdAt: String
    updatedAt: String
  }

  type FacilitySports {
    id: String
    name: String
    facility: [Facility]
    createdAt: String
    updatedAt: String
  }

  # 추가된 Query 타입
  type Query {
    facilities: [Facility]
    facility(id: String!): Facility
  }
`;
