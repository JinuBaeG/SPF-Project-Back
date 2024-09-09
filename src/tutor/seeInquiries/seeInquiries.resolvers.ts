import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 문의 조회 리졸버
const seeInquiriesResolver: Resolver = async (
  _,
  { id, offset },
  { loggedInUser, client }
) => {
  return client.tutorInquiry.findMany({
    take: 20, // 한 번에 최대 20개의 문의를 가져옴
    skip: offset, // 오프셋 적용
    where: {
      tutorId: id,
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
    seeInquiries: protectedResolver(seeInquiriesResolver), // protectedResolver 적용
  },
};

export default resolvers;
