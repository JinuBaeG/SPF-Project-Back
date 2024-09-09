import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editFacility(
      id: String
      title: String
      discription: String
      sortation: String
      titleBannerImage: Upload
    ): MutationResponse
  }
`;
