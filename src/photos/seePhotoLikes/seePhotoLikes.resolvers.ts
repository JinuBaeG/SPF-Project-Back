import { Resolver, Resolvers } from "../../types";

// 사진 좋아요 조회 리졸버
const seePhotoLikesResolver: Resolver = async (_, { id }, { client }) => {
  // 좋아요 목록 조회
  const likes = await client.like.findMany({
    where: {
      photoId: id,
    },
    select: {
      user: true, // 좋아요를 누른 사용자만 반환
    },
  });

  // 좋아요를 누른 사용자 목록 반환
  return likes.map((like) => like.user);
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: seePhotoLikesResolver,
  },
};

export default resolvers;
