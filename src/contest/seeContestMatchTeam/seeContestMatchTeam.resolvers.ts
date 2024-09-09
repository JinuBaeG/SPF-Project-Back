import client from "../../client";

const seeContestMatchTeamResolvers = async (
  _: any,
  { contestMatchGroupId }: { contestMatchGroupId: string }
) => {
  if (!contestMatchGroupId) {
    return {
      ok: false,
      error: "유효한 contestMatchGroupId가 필요합니다.",
    };
  }

  const contestTeams = await client.contestTeam.findMany({
    where: {
      contestMatchGroupId,
    },
    orderBy: {
      id: "asc",
    },
  });

  return {
    ok: true,
    contestTeams,
  };
};

export default {
  Query: {
    seeContestMatchTeam: seeContestMatchTeamResolvers,
  },
};
