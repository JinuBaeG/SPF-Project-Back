import { gql } from "graphql-tag";

export default gql`
  type Query {
    seeFeedCategoryList: [FeedCategoryList]
  }
`;
