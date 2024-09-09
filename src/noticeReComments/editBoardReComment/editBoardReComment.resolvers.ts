import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 리댓글 수정 리졸버
const editNoticeReCommentResolver: Resolver = async (
  _,
  { id, payload },
  { loggedInUser, client }
) => {
  // 리댓글 존재 여부 확인
  const comment = await client.noticeReComment.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  // 리댓글이 없을 경우
  if (!comment) {
    return {
      ok: false,
      error: "댓글을 찾을 수 없습니다.",
    };
  }

  // 권한이 없는 경우
  if (comment.userId !== loggedInUser!.id) {  // Non-null assertion 사용
    return {
      ok: false,
      error: "권한이 없습니다.",
    };
  }

  // 리댓글 수정
  await client.noticeReComment.update({
    where: { id },
    data: { payload },
  });

  return {
    ok: true,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    editNoticeReComment: protectedResolver(editNoticeReCommentResolver),
  },
};

export default resolvers;
