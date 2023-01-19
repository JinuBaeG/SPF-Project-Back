import { gql } from "apollo-server-express";

export default gql`
  type Facility {
    id: Int
    name: String
    discription: String
    activeArea: String
    address: String
    addrRoad: String
    addAddr: String
    zipcode: String
    areaLatitude: String
    areaLongitude: String
    operTime: String
    group: [Group]
    facilitySports: [FacilitySports]
    facilityInfo: [FacilityInfo]
    facilityTag: [FacilityTag]
    createdAt: String
    updatedAt: String
  }

  type FacilityInfo {
    id: Int
    facility: [Facility]
    facilityId: Int
    discription: String
    awardDate: String
    createdAt: String
    updatedAt: String
  }

  type FacilityTag {
    id: Int
    name: String
    imagePath: String
    isUse: Boolean
    isCustom: Boolean
    facility: [Facility]
    createdAt: String
    updatedAt: String
  }

  type FacilitySports {
    id: Int
    name: String
    facility: [Facility]
    createdAt: String
    updatedAt: String
  }
`;
