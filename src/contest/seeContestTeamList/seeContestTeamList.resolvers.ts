import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestTeamListResolver: Resolver = async (
  _,
  { contestId }: { contestId: string }
) => {
  try {
    const teams = await client.contestTeam.findMany({
      where: {
        contest: {
          contestId,
        },
      },
      include: {
        contestUser: {
          include: {
            user: true, // 유저 정보도 포함
          },
        },
      },
      orderBy: [
        {
          id: "asc", // 팀 ID 오름차순 정렬
        },
        { createdAt: "asc" }, // 생성일 오름차순 정렬
      ],
    });

    return {
      ok: true,
      teams,
    };
  } catch (error) {
    return {
      ok: false,
      error: "콘테스트 팀 목록을 가져오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeContestTeamList: seeContestTeamListResolver,
  },
};

export default resolvers;
