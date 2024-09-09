import { Resolver, Resolvers } from "../../types";

// 공지사항 댓글 조회 리졸버
const seeNoticeCommentResolver: Resolver = async (_, { id }, { client }) => {
  // 공지사항 댓글 조회
  const comment = await client.noticeComment.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      notice: true,
    },
  });

  // 댓글이 없을 경우 처리
  if (!comment) {
    return {
      ok: false,
      error: "댓글을 찾을 수 없습니다.",
    };
  }

  return {
    ok: true,
    comment,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeNoticeComment: seeNoticeCommentResolver,
  },
};

export default resolvers;
