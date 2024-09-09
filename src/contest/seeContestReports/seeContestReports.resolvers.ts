import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestReportsResolver: Resolver = async (
  _,
  { id, contestId }: { id: string; contestId: string }
) => {
  const reports = await client.contestReport.findMany({
    where: {
      id,
      contest: {
        contestId,
      },
    },
  });

  if (reports.length === 0) {
    return {
      ok: false,
      error: "No reports found for the given contest.",
    };
  }

  return {
    ok: true,
    reports,
  };
};

const resolvers: Resolvers = {
  Query: {
    seeContestReports: seeContestReportsResolver,
  },
};

export default resolvers;
