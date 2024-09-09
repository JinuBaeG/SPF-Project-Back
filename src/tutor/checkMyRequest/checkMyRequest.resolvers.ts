import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 내 요청 조회 리졸버
const checkMyRequestResolver: Resolver = async (
  _,
  { offset },
  { loggedInUser, client }
) => {
  return client.requestAddTutor.findMany({
    take: 5, // 최대 5개의 요청을 가져옴
    skip: offset, // 오프셋 설정
    where: {
      userId: loggedInUser!.id, // Non-null assertion 사용
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    checkMyRequest: protectedResolver(checkMyRequestResolver), // protectedResolver 적용
  },
};

export default resolvers;
