import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestsByDateResolver: Resolver = async (
  _,
  { date, offset }: { date: string; offset: number },
  ___
) => {
  try {
    const contests = await client.contest.findMany({
      take: 7, // 한 번에 가져올 콘테스트 수
      skip: offset, // 페이지네이션을 위한 offset
      where: {
        contestStartDate: {
          contains: date, // 시작 날짜가 포함된 콘테스트 검색
        },
      },
      orderBy: [{ contestStartDate: "asc" }], // 시작 날짜 오름차순 정렬
    });

    return {
      ok: true,
      contests,
    };
  } catch (error) {
    return {
      ok: false,
      error: "지정된 날짜에 해당하는 콘테스트를 가져올 수 없습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeContestsByDate: seeContestsByDateResolver,
  },
};

export default resolvers;
