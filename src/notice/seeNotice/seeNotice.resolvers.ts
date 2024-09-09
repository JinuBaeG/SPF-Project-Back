import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 조회 리졸버
const seeNoticeResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  // 공지사항 조회
  const notice = await client.notice.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  // 공지사항이 없을 경우 처리
  if (!notice) {
    return {
      ok: false,
      error: "공지사항을 찾을 수 없습니다.",
    };
  }

  return {
    ok: true,
    notice,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeNotice: protectedResolver(seeNoticeResolver),
  },
};

export default resolvers;
