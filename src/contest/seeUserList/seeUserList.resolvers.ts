import client from "../../client";
import { deCryptFunction } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// Resolver 함수 정의
const seeUserlistResolver: Resolver = async (
  _,
  { contestId },
  { client }
) => {
  const contestUsers = await client.contestUser.findMany({
    where: {
      contest: {
        contestId,
      },
    },
    include: {
      user: true,
      contestTeam: true,
      contest: true,
    },
  });

  // 각 유저의 전화번호 복호화 처리
  contestUsers.forEach((contestUser) => {
    if (contestUser.user && contestUser.user.phoneNumber) {
      contestUser.user.phoneNumber = deCryptFunction(contestUser.user.phoneNumber);
    }
  });

  return contestUsers;
};

// 전체 resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeUserList: seeUserlistResolver,
  },
};

export default resolvers;
