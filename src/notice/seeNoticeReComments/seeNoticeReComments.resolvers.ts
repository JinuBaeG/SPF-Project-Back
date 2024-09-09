import { Resolver, Resolvers } from "../../types";

// 공지사항 리댓글 목록 조회 리졸버
const seeNoticeReCommentsResolver: Resolver = async (_, { id, offset }, { client }) => {
  const reComments = await client.noticeReComment.findMany({
    take: 5, // 한 번에 5개의 리댓글만 가져옴
    skip: offset, // 페이징 처리
    where: {
      noticeCommentId: id,
    },
    include: {
      user: true,
      noticeComment: true,
    },
    orderBy: {
      createdAt: "desc", // 최신 리댓글부터 정렬
    },
  });

  if (!reComments || reComments.length === 0) {
    return {
      ok: false,
      error: "리댓글을 찾을 수 없습니다.",
    };
  }

  return {
    ok: true,
    reComments,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeNoticeReComments: seeNoticeReCommentsResolver,
  },
};

export default resolvers;
