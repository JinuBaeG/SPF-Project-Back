import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const seeMyBugReportsResolver: Resolver = async (
  _,
  { offset },
  { loggedInUser, client }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  
  const bugReports = await client.bugReport.findMany({
    take: 5,
    skip: offset,
    where: {
      userId: loggedInUser.id, // 본인의 버그 리포트만 조회
    },
  });

  return {
    ok: true,
    bugReports,
  };
};

const resolvers: Resolvers = {
  Query: {
    seeMyBugReports: protectedResolver(seeMyBugReportsResolver),
  },
};

export default resolvers;
