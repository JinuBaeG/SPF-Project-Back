import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 신고 세부 정보 조회 리졸버
const seeReportDetailResolver: Resolver = async (_, { id }, { loggedInUser }) => {
  return client.report.findUnique({
    where: {
      id,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeReportDetail: protectedResolver(seeReportDetailResolver), // protectedResolver 적용
  },
};

export default resolvers;
