import client from "../client";
import { protectedResolver } from "../users/users.utils";

export default {
  Photo: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
    feedUpload: ({ id }) => {
      return client.feedUpload.findMany({
        where: {
          photo: {
            some: {
              id,
            },
          },
        },
      });
    },
    hashtag: ({ id }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
    likes: ({ id }) => {
      return client.like.count({
        where: {
          photoId: id,
        },
      });
    },
    commentNumber: async ({ id }) => {
      return client.comment.count({
        where: {
          photoId: id,
        },
      });
    },
    comments: async ({ id }) => {
      return client.comment.findMany({
        where: { photoId: id },
        include: { user: true },
      });
    },
    isMine: protectedResolver(async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    }),
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
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
      if (ok) {
        return true;
      }
      return false;
    },
    feedCategoryList: async ({ id }) => {
      return await client.feedCategoryList.findMany({
        where: {
          photo: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
  Hashtag: {
    photos: async ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
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
