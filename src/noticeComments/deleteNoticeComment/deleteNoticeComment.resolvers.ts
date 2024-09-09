import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 댓글 삭제 리졸버
const deleteNoticeCommentResolver: Resolver = async (
  _,
  { id },
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

  // 댓글이 존재하지 않는 경우 처리
  if (!comment) {
    return {
      ok: false,
      error: "찾을 수 없는 댓글입니다.",
    };
  }

  // 권한이 없는 경우 처리
  if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  }

  // 답글이 있는지 확인
  const recomment = await client.noticeReComment.findMany({
    where: {
      noticeCommentId: id,
    },
  });

  // 답글이 없을 때만 댓글 삭제
  if (recomment.length === 0) {
    await client.noticeComment.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }

  // 답글이 있을 경우 삭제 불가 메시지 반환
  return {
    ok: false,
    error: "답글이 존재하여 삭제할 수 없습니다.",
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteNoticeComment: protectedResolver(deleteNoticeCommentResolver),
  },
};

export default resolvers;
