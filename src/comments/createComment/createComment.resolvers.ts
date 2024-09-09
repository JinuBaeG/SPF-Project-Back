import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const createCommentResolver: Resolver = async (
  _,
  { photoId, payload },
  { loggedInUser, client }
) => {

  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  
  const ok = await client.photo.findUnique({
    where: {
      id: photoId,
    },
    select: {
      id: true,
    },
  });
  if (!ok) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  const newComment = await client.comment.create({
    data: {
      payload,
      photo: {
        connect: {
          id: photoId,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  return {
    ok: true,
    id: newComment.id,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(createCommentResolver),
  },
};

export default resolvers;
