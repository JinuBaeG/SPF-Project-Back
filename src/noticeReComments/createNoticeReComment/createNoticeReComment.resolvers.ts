import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 답글(리댓글) 생성 리졸버
const createNoticeReCommentResolver: Resolver = async (
  _,
  { noticeCommentId, payload },
  { loggedInUser, client }
) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  // 댓글이 존재하는지 확인
  const commentExists = await client.noticeComment.findUnique({
    where: {
      id: noticeCommentId,
    },
    select: {
      id: true,
    },
  });

  if (!commentExists) {
    return {
      ok: false,
      error: "댓글이 존재하지 않습니다.",
    };
  }

  // 리댓글 생성
  const newReComment = await client.noticeReComment.create({
    data: {
      payload,
      noticeComment: {
        connect: {
          id: noticeCommentId,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });

  return {
    ok: true,
    id: newReComment.id,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    createNoticeReComment: protectedResolver(createNoticeReCommentResolver),
  },
};

export default resolvers;
