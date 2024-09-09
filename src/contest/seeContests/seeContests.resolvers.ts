import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestsResolver: Resolver = async (
  _,
  { offset }: { offset: number },
  ___
) => {
  try {
    const contests = await client.contest.findMany({
      take: 10, // 페이지네이션을 위해 한 번에 10개씩 불러옵니다.
      skip: offset, // offset을 사용하여 페이지네이션을 구현합니다.
    });

    return {
      ok: true,
      contests,
    };
  } catch (error) {
    return {
      ok: false,
      error: "콘테스트 목록을 가져올 수 없습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeContests: seeContestsResolver,
  },
};

export default resolvers;
