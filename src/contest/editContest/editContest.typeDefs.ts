import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editContest(
      id: String
      contestId: String
      contestName: String
      contestStartDate: String
      contestEndDate: String
      contestRecruitStart: String
      contestRecruitEnd: String
      buildingNumber: String
      dongEubMyunName: String
      gusiName: String
      riName: String
      roadName: String
      sidoName: String
      zipcode: String
      areaLatitude: String
      areaLongitude: String
      contestPlaceAddress: String
      contestStadium: String
      contestHost: String
      contestSponsorShip: String
      contestSports: String
      contestSportsDetail: String
      contestDiscription: String
      contestTerms: String
      contestAwardDetails: String
      contestEntryFee: String
      address: String
      addrRoad: String
      activeArea: String
      contestRecruitNumber: Int
      contestBanner: Upload
    ): MutationResponse
  }
`;
