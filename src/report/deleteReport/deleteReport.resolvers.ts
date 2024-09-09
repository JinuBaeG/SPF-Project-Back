import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 신고 삭제 리졸버
const deleteReportResolver: Resolver = async (_, { id }, { loggedInUser }) => {
  try {
    // 신고 삭제
    await client.report.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "신고를 삭제할 수 없습니다.",
    };
  }
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteReport: protectedResolver(deleteReportResolver), // protectedResolver 적용
  },
};

export default resolvers;
