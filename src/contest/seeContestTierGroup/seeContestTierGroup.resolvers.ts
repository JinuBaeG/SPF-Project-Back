import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestTierGroupResolver: Resolver = async (
  _,
  { contestId, sportsSort, groupSort }: { contestId: string; sportsSort: string; groupSort: string }
) => {
  try {
    const tierGroups = await client.contestTierGroup.findMany({
      where: {
        contestId,
        ...(sportsSort !== "전체" && {
          groupName: {
            contains: sportsSort,
          },
        }),
        ...(groupSort !== "전체" && {
          groupName: {
            contains: groupSort,
          },
        }),
      },
    });

    return {
      ok: true,
      tierGroups,
    };
  } catch (error) {
    return {
      ok: false,
      error: "콘테스트 티어 그룹을 가져오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeContestTierGroup: seeContestTierGroupResolver,
  },
};

export default resolvers;
