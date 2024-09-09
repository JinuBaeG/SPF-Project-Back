import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestTournamentGroupResolver: Resolver = async (
  _,
  { contestGroupId }: { contestGroupId: string }
) => {
  try {
    const tournamentGroups = await client.contestTournamentGroup.findMany({
      where: {
        contestTierGroup: {
          id: contestGroupId,
        },
      },
      include: {
        participants: {
          include: {
            contestCourt: true,
            contestTeam: true,
          },
        },
      },
      orderBy: [
        {
          tournamentRoundText: "asc",
        },
      ],
    });

    return {
      ok: true,
      tournamentGroups,
    };
  } catch (error) {
    return {
      ok: false,
      error: "토너먼트 그룹을 가져오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeContestTournamentGroup: seeContestTournamentGroupResolver,
  },
};

export default resolvers;
