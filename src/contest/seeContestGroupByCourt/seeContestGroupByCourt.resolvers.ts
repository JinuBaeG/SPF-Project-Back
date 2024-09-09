import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const seeContestGroupByCourtResolver: Resolver = async (
  _: any,
  { contestCourtId }: { contestCourtId: string }
) => {
  try {
    const contestMatchHistory = await client.contestGroupMatchHistory.findMany({
      where: {
        contestCourt: {
          id: contestCourtId,
        },
      },
      include: {
        contestTeam: true,
        opponentTeam: true,
        contestCourt: true,
        contestMatchGroup: true,
      },
      orderBy: [
        { contestTeamId: "asc" },
        { opponentTeamId: "asc" },
        { matchNo: "asc" },
        { matchTime: "asc" },
      ],
    });

    if (!contestMatchHistory || contestMatchHistory.length === 0) {
      return {
        ok: false,
        error: "매치 기록을 찾을 수 없습니다.",
      };
    }

    // match 배열에 명시적인 타입 선언
    let match: typeof contestMatchHistory = [];
    let result = "";
    let matchCount = contestMatchHistory.length / 2;
    let count = 0;

    contestMatchHistory.forEach((item) => {
      // opponentTeam과 contestTeam이 null이 아닌 경우에만 처리
      if (
        item.opponentTeam &&
        item.contestTeam &&
        item.opponentTeam.id !== result &&
        matchCount > count
      ) {
        match[count] = item;
        count++;
      }

      if (item.contestTeam && item.contestTeam.id !== result) {
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
      error: "경기 기록을 조회하는 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Query: {
    seeContestGroupByCourt: seeContestGroupByCourtResolver,
  },
};

export default resolvers;
