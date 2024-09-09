import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// Resolver 함수
const deleteBoardCommentResolver: Resolver = async (
  _,
  { id }: { id: string },
  { loggedInUser, client }
) => {
  // loggedInUser가 없는 경우 처리
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  // 댓글이 존재하는지 확인
  const comment = await client.boardComment.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  // 댓글이 존재하지 않을 경우
  if (!comment) {
    return {
      ok: false,
      error: "찾을 수 없는 댓글입니다.",
    };
  }

  // 댓글 작성자와 현재 로그인된 사용자가 일치하지 않을 경우
  if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  }

  // 해당 댓글에 답글이 있는지 확인
  const recomment = await client.boardReComment.findMany({
    where: {
      boardCommentId: id,
    },
  });

  // 답글이 없는 경우 댓글 삭제
  if (recomment.length === 0) {
    await client.boardComment.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }

  // 답글이 있는 경우 삭제 불가
  return {
    ok: false,
    error: "답글이 존재하여 삭제할 수 없습니다.",
  };
};

// Resolvers 객체
const resolvers: Resolvers = {
  Mutation: {
    deleteBoardComment: protectedResolver(deleteBoardCommentResolver),
  },
};

export default resolvers;
