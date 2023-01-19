import { protectedResolver } from "../../users/users.utils";

const toggleLikeResolvers = async (_, { id }, { loggedInUser, client }) => {
  try {
    const photo = await client.photo.findUnique({
      where: {
        id,
      },
    });
    if (!photo) {
      return {
        ok: false,
        error: "피드를 찾을 수 없습니다.",
      };
    }
    const likeWhere = {
      photoId_userId: {
        userId: loggedInUser.id,
        photoId: id,
      },
    };
    const like = await client.like.findUnique({
      where: likeWhere,
    });
    if (like) {
      await client.like.delete({
        where: {
          photoId_userId: {
            userId: loggedInUser.id,
            photoId: id,
          },
        },
      });
    } else {
      await client.like.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          photo: {
            connect: {
              id: photo.id,
            },
          },
        },
      });
    }
    return {
      ok: true,
    };
  } catch (e) {
    console.log(e);
  }
};

export default {
  Mutation: {
    toggleLike: protectedResolver(toggleLikeResolvers),
  },
};
