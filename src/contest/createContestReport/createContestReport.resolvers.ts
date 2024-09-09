import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const createContestReportResolver: Resolver = async (
  _,
  { contestId, reportType, reportTitle, reportDescription },
  { loggedInUser }
) => {

  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  try {
    await client.contestReport.create({
      data: {
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        contest: {
          connect: {
            contestId,
          },
        },
        reportType,
        reportTitle,
        reportDescription,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "대회 신고를 생성할 수 없습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    createContestReport: createContestReportResolver,
  },
};

export default resolvers;
