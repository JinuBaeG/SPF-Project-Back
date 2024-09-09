import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 답글(리댓글) 생성 리졸버
const createReCommentResolver: Resolver = async (
  _,
  { commentId, payload },
  { loggedInUser, client }
) => {
  const comment = await client.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      id: true,
    },
  });

  if (!comment) {
    return {
      ok: false,
      error: "댓글이 존재하지 않습니다.",
    };
  }

  const newComment = await client.reComment.create({
    data: {
      payload,
      comment: {
        connect: {
          id: commentId,
        },
      },
      user: {
        connect: {
          id: loggedInUser!.id, // Non-null assertion 사용
        },
      },
    },
  });

  return {
    ok: true,
    id: newComment.id,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    createReComment: protectedResolver(createReCommentResolver), // protectedResolver 적용
  },
};

export default resolvers;
