import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 내 신고 내역 조회 리졸버
const seeMyReportsResolver: Resolver = async (_, { offset }, { loggedInUser }) => {
  return client.report.findMany({
    take: 5,
    skip: offset,
    where: {
      userId: loggedInUser!.id, // Non-null assertion 사용
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeMyReports: protectedResolver(seeMyReportsResolver), // protectedResolver 적용
  },
};

export default resolvers;
