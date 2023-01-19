import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    feedUpload: [FeedUpload]
    feedCategoryList: [FeedCategoryList]
    caption: String
    likes: Int!
    commentNumber: Int!
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
    photo: Photo
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
`;
