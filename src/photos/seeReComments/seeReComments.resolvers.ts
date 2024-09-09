import { blockUserList } from "../photo.utils";
import { Resolver, Resolvers } from "../../types";
import { BlockUser } from "@prisma/client";

// 리댓글 조회 리졸버
const seeReCommentsResolver: Resolver = async (
  _,
  { id, offset },
  { client, loggedInUser }
) => {
  // 차단된 사용자 목록 조회
  const blockUsers: BlockUser[] = await client.blockUser.findMany({
    where: {
      userId: loggedInUser!.id, // Non-null assertion 적용
    },
  });

  // 차단된 사용자 처리
  const NOT = blockUsers.length > 0 ? blockUserList(blockUsers) : undefined;

  // 리댓글 조회
  return client.reComment.findMany({
    take: 5,
    skip: offset,
    where: {
      commentId: id,
      NOT,
    },
    include: {
      user: true,
      comment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeReComments: seeReCommentsResolver,
  },
};

export default resolvers;
