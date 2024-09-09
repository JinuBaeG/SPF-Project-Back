import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestRoundAdvanceResolver: Resolver = async (
  _,
  { contestGroupId, roundAdvance }: { contestGroupId: string; roundAdvance: number }
) => {
  try {
    const matchGroup = await client.contestMatchGroup.findMany({
      where: {
        contestTierGroup: {
          id: contestGroupId,
        },
      },
      include: {
        contest: true,
        contestTeam: true,
        contestGroupMatchResult: {
          take: roundAdvance,
          include: {
            contestTeam: {
              include: {
                contestUser: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
          orderBy: [
            { totalWin: "desc" },
            { totalScore: "desc" },
            { totalWinScore: "desc" },
          ],
        },
      },
    });

    return {
      ok: true,
      matchGroup,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Could not fetch contest round advance data.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeContestRoundAdvance: seeContestRoundAdvanceResolver,
  },
};

export default resolvers;
