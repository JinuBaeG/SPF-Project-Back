import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 문의 응답 리졸버
const responseInquiryResolver: Resolver = async (
  _,
  { id, tutorId, userId, title, description }, // 'discription' 오타 수정
  { loggedInUser, client }
) => {
  // 문의 업데이트
  const response = await client.tutorInquiry.update({
    where: {
      id,
    },
    data: {
      inquiryResponse: true,
    },
    include: {
      user: true,
      tutor: true,
    },
  });

  // 문의가 업데이트된 경우
  if (response) {
    await client.tutorInquiryComment.create({
      data: {
        responseTitle: title,
        responseDescription: description, // 오타 수정
        user: {
          connect: {
            id: userId,
          },
        },
        tutor: {
          connect: {
            id: tutorId,
          },
        },
        tutorInquiry: {
          connect: {
            id,
          },
        },
        answerOk: false,
      },
    });

    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "문의 응답을 처리하지 못했습니다.",
    };
  }
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    responseInquiry: protectedResolver(responseInquiryResolver), // protectedResolver 적용
  },
};

export default resolvers;
