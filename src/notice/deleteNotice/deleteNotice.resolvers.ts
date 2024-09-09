import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 삭제를 위한 리졸버
const deleteNoticeResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  // 공지사항 존재 여부와 작성자 확인
  const notice = await client.notice.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  // 공지사항이 없을 경우
  if (!notice) {
    return {
      ok: false,
      error: "공지사항이 존재하지 않습니다.",
    };
  }

  // 삭제 권한이 없을 경우
  if (notice.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  }

  // 공지사항 삭제
  await client.notice.delete({
    where: {
      id,
    },
  });

  return {
    ok: true,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteNotice: protectedResolver(deleteNoticeResolver),
  },
};

export default resolvers;
