import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 댓글 생성 리졸버
const createNoticeCommentResolver: Resolver = async (
  _,
  { noticeId, payload },
  { loggedInUser, client }
) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  
  // 공지사항 존재 여부 확인
  const notice = await client.notice.findUnique({
    where: {
      id: noticeId,
    },
    select: {
      id: true,
    },
  });

  // 공지사항이 없을 경우 처리
  if (!notice) {
    return {
      ok: false,
      error: "게시물이 존재하지 않습니다.",
    };
  }

  // 댓글 생성
  const newComment = await client.noticeComment.create({
    data: {
      payload,
      notice: {
        connect: {
          id: noticeId,
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
    id: newComment.id,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    createNoticeComment: protectedResolver(createNoticeCommentResolver),
  },
};

export default resolvers;
