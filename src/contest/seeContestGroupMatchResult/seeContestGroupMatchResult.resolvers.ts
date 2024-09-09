import client from "../../client";

const seeContestGroupMatchResultResolvers = async (
  _: any,
  { contestMatchGroupId }: { contestMatchGroupId: string }
) => {
  try {
    // 입력 검증
    if (!contestMatchGroupId) {
      return {
        ok: false,
        error: "그룹 매치 ID가 제공되지 않았습니다.",
      };
    }

    const matchResults = await client.contestGroupMatchResult.findMany({
      where: {
        contestMatchGroupId,
      },
      include: {
        contest: true,
        contestTeam: {
          include: {
            contestUser: true,
          },
        },
      },
      orderBy: [
        {
          totalWin: "desc",
        },
        { totalScore: "desc" },
        { totalWinScore: "desc" },
      ],
    });

    // 결과가 없을 경우 처리
    if (!matchResults || matchResults.length === 0) {
      return {
        ok: false,
        error: "해당 그룹의 매치 결과가 없습니다.",
      };
    }

    return {
      ok: true,
      matchResults,
    };
  } catch (error) {
    return {
      ok: false,
      error: "매치 결과를 가져오는 중 오류가 발생했습니다.",
    };
  }
};

export default {
  Query: {
    seeContestGroupMatchResult: seeContestGroupMatchResultResolvers,
  },
};
