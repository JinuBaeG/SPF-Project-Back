import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const editBoardCommentResolver: Resolver = async (
  _,
  { id, payload },
  { loggedInUser, client }
) => {
  // loggedInUser가 없을 경우 처리
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

  // 댓글이 존재하지 않는 경우
  if (!comment) {
    return {
      ok: false,
      error: "댓글을 찾을 수 없습니다.",
    };
  }

  // 댓글 작성자와 로그인된 사용자가 일치하지 않는 경우
  if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "수정할 권한이 없습니다.",
    };
  }

  // 댓글 수정
  await client.boardComment.update({
    where: {
      id,
    },
    data: {
      payload,
    },
  });

  return {
    ok: true,
    id,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    editBoardComment: protectedResolver(editBoardCommentResolver),
  },
};

export default resolvers;
