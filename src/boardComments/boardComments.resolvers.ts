import client from "../client";
import { Context, Resolver, Resolvers } from "../types";

// 각 BoardComment에 대한 Resolver
const isMineResolver: Resolver = ({ userId }, _, { loggedInUser }: Context) => {
  if (!loggedInUser) {
    return false;
  }
  return userId === loggedInUser.id;
};

const boardReCommentsResolver: Resolver = async ({ id }) => {
  return await client.boardReComment.findMany({
    where: {
      boardCommentId: id,
    },
    include: {
      user: true,
    },
  });
};

const boardReCommentCountResolver: Resolver = async ({ id }) => {
  return await client.boardReComment.count({
    where: {
      boardCommentId: id,
    },
  });
};

// 전체 Resolvers 구조
const resolvers: Resolvers = {
  BoardComment: {
    isMine: isMineResolver,
    boardReComments: boardReCommentsResolver,
    boardReCommentCount: boardReCommentCountResolver,
  },
};

export default resolvers;
