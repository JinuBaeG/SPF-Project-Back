import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const deleteBugReportResolver: Resolver = async (
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
    },
    select: {
      userId: true,
    },
  });

  if (!bugReport) {
    return {
      ok: false,
      error: "버그 리포트를 찾을 수 없습니다.",
    };
  } else if (bugReport.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  }

  await client.bugReport.delete({
    where: {
      id,
    },
  });

  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    deleteBugReport: protectedResolver(deleteBugReportResolver),
  },
};

export default resolvers;
