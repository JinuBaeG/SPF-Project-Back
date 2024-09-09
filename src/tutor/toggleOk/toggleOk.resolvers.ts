import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 답변 확인 상태 변경 리졸버
const toggleOkResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  const response = await client.tutorInquiryComment.findUnique({
    where: {
      id,
    },
  });

  if (!response) {
    return {
      ok: false,
      error: "문의에 대한 답변을 찾을 수 없습니다.",
    };
  }

  await client.tutorInquiryComment.update({
    where: {
      id,
    },
    data: {
      answerOk: true, // 답변 상태를 true로 업데이트
    },
  });

  return {
    ok: true,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    toggleOk: protectedResolver(toggleOkResolver), // protectedResolver 적용
  },
};

export default resolvers;
