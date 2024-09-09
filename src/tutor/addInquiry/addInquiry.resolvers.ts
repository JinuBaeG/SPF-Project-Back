import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 문의 추가 리졸버
const addInquiryResolver: Resolver = async (
  _,
  { tutorId, title, description },
  { loggedInUser, client }
) => {
  return client.tutorInquiry.create({
    data: {
      tutor: {
        connect: {
          id: tutorId,
        },
      },
      user: {
        connect: {
          id: loggedInUser!.id, // Non-null assertion 사용
        },
      },
      inquiryTitle: title,
      inquiryDescription: description,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    addInquiry: protectedResolver(addInquiryResolver), // protectedResolver 적용
  },
};

export default resolvers;
