import { Resolver, Resolvers } from "../../types";
import client from "../../client";

const seeContestReportResolver: Resolver = async (
  _,
  { id }: { id: string }
) => {
  const report = await client.contestReport.findUnique({
    where: {
      id,
    },
  });

  if (!report) {
    return {
      ok: false,
      error: "Report not found.",
    };
  }

  return {
    ok: true,
    report,
  };
};

const resolvers: Resolvers = {
  Query: {
    seeContestReport: seeContestReportResolver,
  },
};

export default resolvers;
