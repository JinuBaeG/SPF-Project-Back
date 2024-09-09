import client from "../../client";

const seeContestGroupMatchScheduleResolvers = async (
  _: any,
  { contestMatchGroupId }: { contestMatchGroupId: string }
) => {
  try {
    const contestTeamList = await client.contestTeam.findMany({
      where: {
        contestMatchGroupId,
      },
    });

    const contestMatchHistory = await client.contestGroupMatchHistory.findMany({
      where: {
        contestMatchGroupId,
      },
      include: {
        contestTeam: true,
        opponentTeam: true,
        contestCourt: true,
      },
      orderBy: [
        {
          contestTeamId: "asc",
        },
        { opponentTeamId: "asc" },
      ],
    });

    if (!contestTeamList || contestTeamList.length === 0) {
      return {
        ok: false,
        error: "경기에 참가한 팀이 없습니다.",
      };
    }

    if (!contestMatchHistory || contestMatchHistory.length === 0) {
      return {
        ok: false,
        error: "매치 히스토리가 없습니다.",
      };
    }

    let result: string | undefined = "";
    let matchCount = Math.floor(
      (contestTeamList.length * (contestTeamList.length - 1)) / 2
    );

    let match: typeof contestMatchHistory = [];
    let count = 0;

    contestMatchHistory.forEach((item) => {
      if (
        item.opponentTeam?.id !== result && // opponentTeam.id가 있을 경우에만 비교
        matchCount > count
      ) {
        match[count] = item;
        count++;
      }

      if (item.contestTeam?.id !== undefined) { // contestTeam.id가 undefined가 아닌 경우에만 처리
        result = item.contestTeam.id;
      }
    });

    return {
      ok: true,
      match,
    };
  } catch (error) {
    return {
      ok: false,
      error: "일정을 가져오는 중 오류가 발생했습니다.",
    };
  }
};

export default {
  Query: {
    seeContestGroupMatchSchedule: seeContestGroupMatchScheduleResolvers,
  },
};
