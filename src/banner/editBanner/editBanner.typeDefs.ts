import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    editBanner(
      id: String
      title: String
      discription: String
      sortation: String
      titleBannerImage: Upload
    ): MutationResponse
  }
`;
