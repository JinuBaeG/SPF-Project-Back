import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 튜터 추가 요청 리졸버
const requestAddTutorResolver: Resolver = async (
  _,
  { title, description }, // 'discription' 오타 수정
  { loggedInUser, client }
) => {
  const tutor = await client.requestAddTutor.create({
    data: {
      user: {
        connect: {
          id: loggedInUser!.id, // Non-null assertion 사용
        },
      },
      title,
      description, // 오타 수정
    },
  });

  if (tutor) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "튜터 요청을 처리하지 못했습니다.", // 에러 메시지 개선
    };
  }
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    requestAddTutor: requestAddTutorResolver,
  },
};

export default resolvers;
