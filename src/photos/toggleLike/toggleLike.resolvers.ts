import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 좋아요 토글 리졸버
const toggleLikeResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  try {
    const photo = await client.photo.findUnique({
      where: { id },
    });

    // 피드가 존재하지 않는 경우 처리
    if (!photo) {
      return {
        ok: false,
        error: "피드를 찾을 수 없습니다.",
      };
    }

    const likeWhere = {
      photoId_userId: {
        userId: loggedInUser!.id, // Non-null assertion 사용
        photoId: id,
      },
    };

    const like = await client.like.findUnique({
      where: likeWhere,
    });

    // 좋아요가 이미 있는 경우 삭제
    if (like) {
      await client.like.delete({
        where: likeWhere,
      });
    }
    // 좋아요가 없는 경우 생성
    else {
      await client.like.create({
        data: {
          user: {
            connect: {
              id: loggedInUser!.id, // Non-null assertion 사용
            },
          },
          photo: {
            connect: {
              id: photo.id,
            },
          },
        },
      });
    }

    return {
      ok: true,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      error: "좋아요를 처리할 수 없습니다.",
    };
  }
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(toggleLikeResolver), // protectedResolver 적용
  },
};

export default resolvers;
