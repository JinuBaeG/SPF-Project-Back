import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: String!
    user: User
    file: String!
    caption: String
    likes: Int!
    comments: Int!
    hashtag: [Hashtag]
    isMine: Boolean!
    isLiked: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: String!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: String!
    photoId: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
