import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 단일 문의 조회 리졸버
const seeInquiryResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  return client.tutorInquiry.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      tutor: true,
      tutorInquiryComment: true, // 문의에 대한 댓글도 포함
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeInquiry: protectedResolver(seeInquiryResolver), // protectedResolver 적용
  },
};

export default resolvers;
