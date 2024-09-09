import { gql } from "graphql-tag";

export default gql`
  type Banner {
    id: String
    title: String
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
    areaLatitude: String
    areaLongtitude: String
    sportsEvent: String
    sortation: String
    bannerImagePath: String
    titleBannerImage: Upload
    createdAt: String
    updatedAt: String
  }

  # 추가된 Query 타입
  type Query {
    banners: [Banner]
    banner(id: String!): Banner
  }
`;
