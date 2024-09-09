import client from "../client";
import { Resolver, Resolvers } from "../types";

// Resolver 함수들
const isMineResolver: Resolver = ({ userId }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  return userId === loggedInUser.id;
};

const reCommentsResolver: Resolver = async ({ id }) => {
  return await client.reComment.findMany({
    where: {
      commentId: id,
    },
    include: {
      user: true,
    },
  });
};

const reCommentCountResolver: Resolver = async ({ id }) => {
  return await client.reComment.count({
    where: {
      commentId: id,
    },
  });
};

// Resolvers 객체
const resolvers: Resolvers = {
  Comment: {
    isMine: isMineResolver,
    reComments: reCommentsResolver,
    reCommentCount: reCommentCountResolver,
  },
};

export default resolvers;
