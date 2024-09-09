import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 개별 resolver
const deleteBoardReCommentResolver: Resolver = async (
  _,
  { id },
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

  // 댓글이 존재하지 않는 경우
  if (!comment) {
    return {
      ok: false,
      error: "찾을 수 없는 댓글입니다.",
    };
  }

  // 댓글 작성자와 현재 로그인된 사용자가 일치하지 않는 경우
  if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  }

  // 댓글 삭제
  await client.boardReComment.delete({
    where: {
      id,
    },
  });

  return {
    ok: true,
  };
};

// 전체 resolvers 구조
const resolvers: Resolvers = {
  Mutation: {
    deleteBoardReComment: protectedResolver(deleteBoardReCommentResolver),
  },
};

export default resolvers;
