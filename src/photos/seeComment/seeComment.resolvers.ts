import { Resolver, Resolvers } from "../../types";

// 댓글 조회 리졸버
const seeCommentResolver: Resolver = async (_, { id }, { client }) => {
  return client.comment.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      photo: true,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeComment: seeCommentResolver,
  },
};

export default resolvers;
