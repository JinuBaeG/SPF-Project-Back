import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFacilities(
      offset: Int
      sportsEvent: String
      maxX: Float
      maxY: Float
      minX: Float
      minY: Float
    ): [Facility]
  }
`;
