import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const createContestNoticeResolver: Resolver = async (
  _,
  { contestId, noticeTitle, noticeDescription }
) => {
  try {
    await client.contestNotice.create({
      data: {
        contest: {
          connect: {
            contestId,
          },
        },
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
      error: "공지사항을 생성할 수 없습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    createContestNotice: createContestNoticeResolver,
  },
};

export default resolvers;
