import client from "../../client";

const seeContestGroupMatchResolvers = async (
  _: any,
  { contestGroupId }: { contestGroupId: string }
) => {
  try {
    if (!contestGroupId) {
      return {
        ok: false,
        error: "그룹 ID가 제공되지 않았습니다.",
      };
    }

    const groupMatches = await client.contestMatchGroup.findMany({
      where: {
        contestTierGroupId: contestGroupId,
      },
      include: {
        contestTeam: {
          include: {
            contestUser: true,
            contestGroupMatchResult: {
              orderBy: [
                {
                  totalWin: "asc",
                },
                { totalScore: "asc" },
                { totalWinScore: "asc" },
              ],
            },
          },
        },
      },
    });

    if (!groupMatches || groupMatches.length === 0) {
      return {
        ok: false,
        error: "해당 그룹에 매치가 없습니다.",
      };
    }

    return {
      ok: true,
      groupMatches,
    };
  } catch (error) {
    return {
      ok: false,
      error: "매치 정보를 가져오는 중 오류가 발생했습니다.",
    };
  }
};

export default {
  Query: {
    seeContestGroupMatch: seeContestGroupMatchResolvers,
  },
};
