import client from "../../client";

const seeContestNoticesResolvers = async (
  _: any,
  { id, contestId }: { id?: string; contestId: string }
) => {
  if (!contestId) {
    return {
      ok: false,
      error: "유효한 contestId가 필요합니다.",
    };
  }

  const notices = await client.contestNotice.findMany({
    where: {
      ...(id && { id }),
      contest: {
        contestId,
      },
    },
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

export default {
  Query: {
    seeContestNotices: seeContestNoticesResolvers,
  },
};
