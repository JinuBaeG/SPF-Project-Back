import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const seeContestCourtResolver: Resolver = async (
  _: any,
  { contestId }: { contestId: string }
) => {
  try {
    const contestCourts = await client.contestCourt.findMany({
      where: {
        contestId,
      },
      orderBy: {
        courtName: "asc",
      },
    });

    if (contestCourts.length === 0) {
      return {
        ok: false,
        error: "해당 대회의 코트를 찾을 수 없습니다.",
      };
    }

    return {
      ok: true,
      contestCourts,
    };
  } catch (error) {
    return {
      ok: false,
      error: "대회 코트 조회 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Query: {
    seeContestCourt: seeContestCourtResolver,
  },
};

export default resolvers;
