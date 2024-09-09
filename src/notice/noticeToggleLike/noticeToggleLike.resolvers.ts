import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 좋아요 토글 리졸버
const noticeToggleLikeResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  
  try {
    // 공지사항이 존재하는지 확인
    const notice = await client.notice.findUnique({
      where: {
        id,
      },
    });

    // 공지사항이 없을 경우 처리
    if (!notice) {
      return {
        ok: false,
        error: "공지사항을 찾을 수 없습니다.",
      };
    }

    // 좋아요 여부 확인
    const likeWhere = {
      noticeId_userId: {
        userId: loggedInUser.id,
        noticeId: id,
      },
    };

    const like = await client.noticeLike.findUnique({
      where: likeWhere,
    });

    // 이미 좋아요한 경우, 좋아요 삭제
    if (like) {
      await client.noticeLike.delete({
        where: likeWhere,
      });
    } 
    // 좋아요하지 않은 경우, 좋아요 생성
    else {
      await client.noticeLike.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          notice: {
            connect: {
              id: notice.id,
            },
          },
        },
      });
    }

    return {
      ok: true,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: "좋아요 토글 중 오류가 발생했습니다.",
    };
  }
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    noticeToggleLike: protectedResolver(noticeToggleLikeResolver),
  },
};

export default resolvers;
