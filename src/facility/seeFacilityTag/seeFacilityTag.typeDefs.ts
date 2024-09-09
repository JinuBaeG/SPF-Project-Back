import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFacilityTag(offset: Int): [FacilityTag]
  }
`;
