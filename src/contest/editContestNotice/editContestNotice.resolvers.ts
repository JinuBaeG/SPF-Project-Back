import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const editContestNoticeResolver: Resolver = async (
  _: any,
  { id, contestId, noticeTitle, noticeDescription }: { id: string; contestId: string; noticeTitle: string; noticeDescription: string }
) => {
  try {
    // 공지사항 업데이트
    await client.contestNotice.update({
      where: {
        id,
      },
      data: {
        noticeTitle,
        noticeDescription,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "공지사항 수정 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    editContestNotice: editContestNoticeResolver,
  },
};

export default resolvers;
