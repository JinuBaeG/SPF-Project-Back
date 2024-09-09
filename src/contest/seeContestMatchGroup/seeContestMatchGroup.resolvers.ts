import client from "../../client";

const seeContestMatchGroupResolvers = async (
  _: any,
  { contestGroupId }: { contestGroupId: string }
) => {
  if (!contestGroupId) {
    return {
      ok: false,
      error: "유효한 contestGroupId가 필요합니다.",
    };
  }

  const contestMatchGroups = await client.contestMatchGroup.findMany({
    where: {
      contestTierGroupId: contestGroupId,
    },
    include: {
      contestTierGroup: true,
    },
    orderBy: {
      groupNo: "asc",
    },
  });

  return {
    ok: true,
    contestMatchGroups,
  };
};

export default {
  Query: {
    seeContestMatchGroup: seeContestMatchGroupResolvers,
  },
};
