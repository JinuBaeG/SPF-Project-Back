import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 튜터 목록 조회 리졸버
const seeTutorsResolver: Resolver = async (
  _,
  { offset, sportsEvent },
  { loggedInUser, client }
) => {
  const searchCondition = sportsEvent && sportsEvent !== "모든 종목"
    ? {
        tutorSportsEvent: {
          some: {
            name: sportsEvent,
          },
        },
        access: true,
      }
    : { access: true };

  return client.tutor.findMany({
    take: 3,
    skip: offset,
    where: searchCondition,
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeTutors: seeTutorsResolver,
  },
};

export default resolvers;
