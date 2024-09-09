import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFacility(id: String): Facility
  }
`;
