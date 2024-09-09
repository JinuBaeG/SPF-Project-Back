import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 피드 삭제 리졸버
const deletePhotoResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  // 피드 존재 여부 확인
  const photo = await client.photo.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!photo) {
    return {
      ok: false,
      error: "피드가 존재하지 않습니다.",
    };
  }

  // 권한이 없는 경우 처리
  if (photo.userId !== loggedInUser!.id) {
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  }

  // 댓글이 존재하는지 확인
  const comments = await client.comment.findMany({
    where: { photoId: id },
  });

  if (comments.length > 0) {
    return {
      ok: false,
      error: "댓글이 존재하여 삭제할 수 없습니다.",
    };
  }

  // 피드 삭제
  await client.photo.delete({
    where: { id },
  });

  return {
    ok: true,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectedResolver(deletePhotoResolver),
  },
};

export default resolvers;
