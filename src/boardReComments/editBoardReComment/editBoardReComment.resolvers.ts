import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 개별 resolver
const editBoardReCommentResolver: Resolver = async (
  _,
  { id, payload },
  { loggedInUser, client }
) => {
  // loggedInUser가 null 또는 undefined인 경우 처리
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  const comment = await client.boardReComment.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  if (!comment) {
    return {
      ok: false,
      error: "댓글을 찾을 수 없습니다.",
    };
  } else if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "수정할 권한이 없습니다.",
    };
  } else {
    await client.boardReComment.update({
      where: {
        id,
      },
      data: {
        payload,
      },
    });
    return {
      ok: true,
    };
  }
};

// 전체 resolvers 구조
const resolvers: Resolvers = {
  Mutation: {
    editBoardReComment: protectedResolver(editBoardReCommentResolver),
  },
};

export default resolvers;
