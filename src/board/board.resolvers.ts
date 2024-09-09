import client from "../client";
import { protectedResolver } from "../users/users.utils";
import { Resolvers, Resolver } from "../types";

const userResolver: Resolver = async ({ userId }) => {
  return await client.user.findUnique({
    where: {
      id: userId,
    },
  });
};

const groupResolver: Resolver = async ({ groupId }) => {
  if (groupId === null || groupId === undefined) {
    return null;
  }
  return await client.group.findUnique({
    where: {
      id: groupId,
    },
  });
};

const tutorResolver: Resolver = async ({ tutorId }) => {
  if (tutorId === null || tutorId === undefined) {
    return null;
  }
  return await client.tutor.findUnique({
    where: {
      id: tutorId,
    },
  });
};

const likesResolver: Resolver = ({ id }) => {
  return client.boardLike.count({
    where: {
      boardId: id,
    },
  });
};

const boardCommentCountResolver: Resolver = ({ id }) => {
  return client.boardComment.count({
    where: {
      boardId: id,
    },
  });
};

const boardCommentsResolver: Resolver = ({ id }) => {
  return client.boardComment.findMany({
    where: { boardId: id },
    include: { user: true },
  });
};

const isMineResolver: Resolver = protectedResolver(
  async ({ userId }, _, { loggedInUser }) => {
    if (!loggedInUser) {
      return false;
    }
    return userId === loggedInUser.id;
  }
);

const isLikedResolver: Resolver = async ({ id }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  const ok = await client.boardLike.findUnique({
    where: {
      boardId_userId: {
        boardId: id,
        userId: loggedInUser.id,
      },
    },
    select: {
      id: true,
    },
  });
  return !!ok;
};

const resolvers: Resolvers = {
  Board: {
    user: userResolver,
    group: groupResolver,
    tutor: tutorResolver,
    likes: likesResolver,
    boardCommentCount: boardCommentCountResolver,
    boardComments: boardCommentsResolver,
    isMine: isMineResolver,
    isLiked: isLikedResolver,
  },
};

export default resolvers;
