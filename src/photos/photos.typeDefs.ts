import { gql } from "graphql-tag";

export default gql`
  type Photo {
    id: Int!
    user: User!
    feedUpload: [FeedUpload]
    feedCategory: String
    caption: String
    sportsEvent: String
    publicLevel: String
    likes: Int!
    commentCount: Int!
    comments: [Comment]
    hashtag: [Hashtag]
    isMine: Boolean!
    isLiked: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type FeedCategoryList {
    id: Int
    name: String
    sortKey: Int
    createdAt: String!
    updatedAt: String!
  }

  type FeedUpload {
    id: Int!
    photoId: Photo
    imagePath: String
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photoId: Photo!
    createdAt: String!
    updatedAt: String!
  }

  # 추가된 Query 타입
  type Query {
    photos: [Photo]
    photo(id: Int!): Photo
    feedCategoryLists: [FeedCategoryList]
    hashtags: [Hashtag]
    hashtag(id: Int!): Hashtag
    likes: [Like]
  }
`;
