import client from "../../client";

const seeContestGroupsResolvers = async (
  _: any,
  { contestId }: { contestId: string }
) => {
  try {
    const groups = await client.contestTierGroup.findMany({
      where: {
        contestId,
      },
    });

    if (!groups || groups.length === 0) {
      return {
        ok: false,
        error: "해당 대회의 그룹을 찾을 수 없습니다.",
      };
    }

    return {
      ok: true,
      groups,
    };
  } catch (error) {
    return {
      ok: false,
      error: "그룹을 가져오는 중 오류가 발생했습니다.",
    };
  }
};

export default {
  Query: {
    seeContestGroups: seeContestGroupsResolvers,
  },
};
