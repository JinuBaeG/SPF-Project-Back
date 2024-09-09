import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestTournamentHistoryResolver: Resolver = async (
  _,
  { contestGroupTierId }: { contestGroupTierId: string }
) => {
  try {
    const tournamentHistories = await client.contestTournamentHistory.findMany({
      where: {
        contestTierGroup: { id: contestGroupTierId },
      },
      include: {
        contest: true,
        contestTeam: true,
        opponentTeam: true,
        contestCourt: true,
        contestTournamentGroup: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      ok: true,
      tournamentHistories,
    };
  } catch (error) {
    return {
      ok: false,
      error: "토너먼트 히스토리를 가져오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeContestTournamentHistory: seeContestTournamentHistoryResolver,
  },
};

export default resolvers;
