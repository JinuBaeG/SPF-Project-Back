import { gql } from "graphql-tag";

export default gql`
  type Mutation {
    createBanner(
      title: String
      discription: String
      sortation: String
      titleBannerImage: Upload
    ): MutationResponse
  }
`;
