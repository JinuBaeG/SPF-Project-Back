import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 개별 resolver
const createBoardReCommentResolver: Resolver = async (
  _,
  { boardCommentId, payload },
  { loggedInUser, client }
) => {
  // loggedInUser가 null 또는 undefined인 경우 처리
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  const ok = await client.boardComment.findUnique({
    where: {
      id: boardCommentId,
    },
    select: {
      id: true,
    },
  });
  if (!ok) {
    return {
      ok: false,
      error: "댓글이 존재하지 않습니다.",
    };
  }
  const newComment = await client.boardReComment.create({
    data: {
      payload,
      boardComment: {
        connect: {
          id: boardCommentId,
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

// 전체 resolvers 구조
const resolvers: Resolvers = {
  Mutation: {
    createBoardReComment: protectedResolver(createBoardReCommentResolver),
  },
};

export default resolvers;
