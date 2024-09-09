import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 내 문의 조회 리졸버
const seeMyInquiriesResolver: Resolver = async (
  _,
  { offset },
  { loggedInUser, client }
) => {
  return client.tutorInquiry.findMany({
    take: 20, // 최대 20개의 문의를 가져옴
    skip: offset, // 오프셋 적용
    where: {
      userId: loggedInUser!.id, // Non-null assertion 사용
    },
    include: {
      user: true,
      tutor: true,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeMyInquiries: protectedResolver(seeMyInquiriesResolver), // protectedResolver 적용
  },
};

export default resolvers;
