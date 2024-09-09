import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// Resolver 함수
const editCommentResolver: Resolver = async (
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
  const comment = await client.comment.findUnique({
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
      error: "댓글을 찾을 수 없습니다.",
    };
  }

  // 댓글 작성자와 로그인 유저가 다를 경우
  if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "권한이 없습니다.",
    };
  }

  // 댓글 업데이트
  await client.comment.update({
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
};

// Resolvers 객체
const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(editCommentResolver),
  },
};

export default resolvers;
