import client from "../../client";
import { blockUserList } from "../photo.utils";
import { Resolver, Resolvers } from "../../types";
import { BlockUser } from "@prisma/client";  // Prisma에서 생성된 BlockUser 타입 가져오기

// 피드 조회 리졸버
const seeFeedResolver: Resolver = async (
  _,
  { offset, sportsEvent, category },
  { loggedInUser }
) => {
  let blockUsers: BlockUser[] = [];  // BlockUser 타입 명시
  
  // 로그인된 사용자가 있을 경우, 차단된 사용자 목록 조회
  if (loggedInUser) {
    blockUsers = await client.blockUser.findMany({
      where: {
        userId: loggedInUser.id,
      },
    });
  }

  // 차단된 사용자 리스트 생성
  const NOT = blockUsers.length > 0 ? blockUserList(blockUsers) : undefined;

  // 조건을 기반으로 피드 조회
  const where = {
    ...(sportsEvent && sportsEvent !== "모든 종목" && { sportsEvent }),
    ...(category && { feedCategory: category }),
    NOT,
  };

  // 피드 반환
  return client.photo.findMany({
    take: 2,
    skip: offset,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeFeed: seeFeedResolver,
  },
};

export default resolvers;
