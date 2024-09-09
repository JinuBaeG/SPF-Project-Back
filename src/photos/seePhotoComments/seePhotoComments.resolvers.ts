import { blockUserList } from "../photo.utils";
import { Resolver, Resolvers } from "../../types";
import { BlockUser } from "@prisma/client";
import { protectedResolver } from "../../users/users.utils";

// 사진 댓글 조회 리졸버
const seePhotoCommentsResolver: Resolver = async (
  _,
  { id, offset },
  { client, loggedInUser }
) => {
  // Non-null assertion 사용
  let blockUsers: BlockUser[] = await client.blockUser.findMany({
    where: {
      userId: loggedInUser!.id, // Non-null assertion
    },
  });

  // 차단된 사용자 처리
  const NOT = blockUsers.length > 0 ? blockUserList(blockUsers) : undefined;

  // 댓글 조회
  return client.comment.findMany({
    take: 5,
    skip: offset,
    where: {
      photoId: id,
      NOT,
    },
    include: {
      user: true,
      photo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seePhotoComments: protectedResolver(seePhotoCommentsResolver), // protectedResolver 적용
  },
};

export default resolvers;
