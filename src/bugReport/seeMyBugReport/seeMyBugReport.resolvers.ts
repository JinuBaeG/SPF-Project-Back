import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const seeMyBugReportResolver: Resolver = async (
  _,
  { id },
  { loggedInUser, client }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  
  const bugReport = await client.bugReport.findUnique({
    where: {
      id,
      userId: loggedInUser.id, // 본인의 버그 리포트만 조회하도록 수정
    },
  });

  if (!bugReport) {
    return {
      ok: false,
      error: "버그 리포트를 찾을 수 없습니다.",
    };
  }

  return {
    ok: true,
    bugReport,
  };
};

const resolvers: Resolvers = {
  Query: {
    seeMyBugReport: protectedResolver(seeMyBugReportResolver),
  },
};

export default resolvers;
