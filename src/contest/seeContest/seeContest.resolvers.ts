import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const seeContestResolver: Resolver = async (
  _: any,
  { contestId }: { contestId: string }
) => {
  try {
    const contest = await client.contest.findUnique({
      where: {
        contestId,
      },
    });

    if (!contest) {
      return {
        ok: false,
        error: "대회를 찾을 수 없습니다.",
      };
    }

    return {
      ok: true,
      contest,
    };
  } catch (error) {
    return {
      ok: false,
      error: "대회 조회 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Query: {
    seeContest: seeContestResolver,
  },
};

export default resolvers;