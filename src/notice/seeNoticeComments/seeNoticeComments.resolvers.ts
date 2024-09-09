import { Resolver, Resolvers } from "../../types";

// 공지사항 댓글 목록 조회 리졸버
const seeNoticeCommentsResolver: Resolver = async (_, { id, offset }, { client }) => {
  const comments = await client.noticeComment.findMany({
    take: 5, // 한 번에 5개의 댓글만 가져옴
    skip: offset, // 오프셋을 통해 페이징 처리
    where: {
      noticeId: id,
    },
    include: {
      user: true,
      notice: true,
    },
    orderBy: {
      createdAt: "desc", // 최신 댓글부터 정렬
    },
  });

  if (!comments) {
    return {
      ok: false,
      error: "댓글을 찾을 수 없습니다.",
    };
  }

  return {
    ok: true,
    comments,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeNoticeComments: seeNoticeCommentsResolver,
  },
};

export default resolvers;
