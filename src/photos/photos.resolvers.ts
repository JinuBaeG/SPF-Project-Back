import client from "../client";
import { Resolver, Resolvers } from "../types";

// 사진 관련 리졸버
const photoResolvers: Resolvers = {
  Photo: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: { id: userId },
      });
    },
    feedUpload: ({ id }) => {
      return client.feedUpload.findMany({
        where: {
          photo: {
            some: { id },
          },
        },
      });
    },
    hashtag: ({ id }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: { id },
          },
        },
      });
    },
    likes: ({ id }) => {
      return client.like.count({
        where: { photoId: id },
      });
    },
    commentCount: async ({ id }) => {
      return client.comment.count({
        where: { photoId: id },
      });
    },
    comments: async ({ id }) => {
      return client.comment.findMany({
        where: { photoId: id },
        include: { user: true },
      });
    },
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const like = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      return !!like;
    },
  },
};

// 해시태그 관련 리졸버
const hashtagResolvers: Resolvers = {
  Hashtag: {
    photos: async ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: { id },
        })
        .photos();
    },
    totalPhotos: async ({ id }) => {
      return client.photo.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      });
    },
  },
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  ...photoResolvers,
  ...hashtagResolvers,
};

export default resolvers;
