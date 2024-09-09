import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestTeamsResolver: Resolver = async (
  _,
  { contestId }: { contestId: string }
) => {
  try {
    const teams = await client.contestTeam.findMany({
      where: {
        contest: {
          contestId,
        },
        contestMatchGroupId: null, // match group에 속하지 않은 팀만 가져옴
      },
      orderBy: {
        id: "asc", // 팀 ID 오름차순 정렬
      },
    });

    return {
      ok: true,
      teams,
    };
  } catch (error) {
    return {
      ok: false,
      error: "콘테스트 팀을 가져오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeContestTeams: seeContestTeamsResolver,
  },
};

export default resolvers;
