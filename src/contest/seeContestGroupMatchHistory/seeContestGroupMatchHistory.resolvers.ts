import client from "../../client";

const seeContestGroupMatchHistoryResolvers = async (
  _: any,
  { contestMatchGroupId }: { contestMatchGroupId: string }
) => {
  try {
    // contestMatchGroupId가 제공되지 않았을 때 처리
    if (!contestMatchGroupId) {
      return {
        ok: false,
        error: "그룹 매치 ID가 제공되지 않았습니다.",
      };
    }

    const matchHistory = await client.contestGroupMatchHistory.findMany({
      where: {
        contestMatchGroupId,
      },
      include: {
        contestTeam: true,
        contestCourt: true,
      },
      orderBy: {
        contestTeamId: "asc",
      },
    });

    // 매치 히스토리가 없을 경우 처리
    if (!matchHistory || matchHistory.length === 0) {
      return {
        ok: false,
        error: "해당 그룹에 매치 기록이 없습니다.",
      };
    }

    return {
      ok: true,
      matchHistory,
    };
  } catch (error) {
    return {
      ok: false,
      error: "매치 기록을 가져오는 중 오류가 발생했습니다.",
    };
  }
};

export default {
  Query: {
    seeContestGroupMatchHistory: seeContestGroupMatchHistoryResolvers,
  },
};
