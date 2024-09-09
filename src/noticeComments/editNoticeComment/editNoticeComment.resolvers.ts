import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 댓글 수정 리졸버
const editNoticeCommentResolver: Resolver = async (
  _,
  { id, payload },
  { loggedInUser, client }
) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  // 댓글 조회
  const comment = await client.noticeComment.findUnique({
    where: { id },
    select: { userId: true },
  });

  // 댓글이 존재하지 않는 경우
  if (!comment) {
    return {
      ok: false,
      error: "댓글을 찾을 수 없습니다.",
    };
  }

  // 댓글 수정 권한이 없는 경우
  if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "수정할 권한이 없습니다.",
    };
  }

  // 댓글 수정
  await client.noticeComment.update({
    where: { id },
    data: { payload },
  });

  return {
    ok: true,
    id,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    editNoticeComment: protectedResolver(editNoticeCommentResolver),
  },
};

export default resolvers;
