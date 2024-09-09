import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const seeContestByUserIdResolver: Resolver = async (
  _: any,
  { userId }: { userId: string }
) => {
  try {
    const contests = await client.contest.findMany({
      where: {
        contestUser: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      include: {
        contestUser: true,
      },
    });

    if (contests.length === 0) {
      return {
        ok: false,
        error: "사용자가 참가한 대회를 찾을 수 없습니다.",
      };
    }

    return {
      ok: true,
      contests,
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
    seeContestByUserId: seeContestByUserIdResolver,
  },
};

export default resolvers;
