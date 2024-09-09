import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 답글(리댓글) 삭제 리졸버
const deleteNoticeReCommentResolver: Resolver = async (
  _,
  { id },
  { loggedInUser, client }
) => {
  // 댓글 조회
  const reComment = await client.noticeReComment.findUnique({
    where: { id },
    select: { userId: true },
  });

  // 댓글이 존재하지 않는 경우
  if (!reComment) {
    return {
      ok: false,
      error: "찾을 수 없는 댓글입니다.",
    };
  }

  // 권한이 없는 경우
  if (reComment.userId !== loggedInUser!.id) {  // Non-null assertion 사용
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  }

  // 리댓글 삭제
  await client.noticeReComment.delete({
    where: { id },
  });

  return {
    ok: true,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteNoticeReComment: protectedResolver(deleteNoticeReCommentResolver),
  },
};

export default resolvers;
