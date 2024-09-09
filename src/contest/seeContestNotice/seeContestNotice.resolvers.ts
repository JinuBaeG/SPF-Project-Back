import client from "../../client";

const seeContestNoticeResolvers = async (
  _: any,
  { id }: { id: string }
) => {
  if (!id) {
    return {
      ok: false,
      error: "유효한 id가 필요합니다.",
    };
  }

  const contestNotice = await client.contestNotice.findUnique({
    where: {
      id,
    },
  });

  if (!contestNotice) {
    return {
      ok: false,
      error: "해당 공지를 찾을 수 없습니다.",
    };
  }

  return {
    ok: true,
    contestNotice,
  };
};

export default {
  Query: {
    seeContestNotice: seeContestNoticeResolvers,
  },
};
