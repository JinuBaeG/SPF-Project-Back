import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 공지사항 목록 조회 리졸버
const seeNoticesResolver: Resolver = async (
  _,
  { id, sortation, offset },
  { client }
) => {
  // 분류에 따른 where 조건 설정
  let sortationWhere = {};
  if (sortation === "group") {
    sortationWhere = { groupId: id, sortation };
  } else if (sortation === "tutor") {
    sortationWhere = { tutorId: id, sortation };
  } else {
    return {
      ok: false,
      error: "잘못된 분류입니다.",
    };
  }

  // 공지사항 목록 조회
  const notices = await client.notice.findMany({
    take: 5, // 한 번에 5개의 공지사항을 가져옴
    skip: offset, // 페이징 처리
    where: sortationWhere,
  });

  if (!notices || notices.length === 0) {
    return {
      ok: false,
      error: "공지사항을 찾을 수 없습니다.",
    };
  }

  return {
    ok: true,
    notices,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeNotices: protectedResolver(seeNoticesResolver),
  },
};

export default resolvers;
