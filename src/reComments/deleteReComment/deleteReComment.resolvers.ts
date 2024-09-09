import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 리댓글 삭제 리졸버
const deleteReCommentResolver: Resolver = async (_, { id }, { loggedInUser, client }) => {
  // 리댓글 존재 여부 확인
  const reComment = await client.reComment.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!reComment) {
    return {
      ok: false,
      error: "찾을 수 없는 댓글입니다.",
    };
  }

  // 권한이 없는 경우 처리
  if (reComment.userId !== loggedInUser!.id) { // Non-null assertion 사용
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  }

  // 리댓글 삭제
  await client.reComment.delete({
    where: { id },
  });

  return {
    ok: true,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteReComment: protectedResolver(deleteReCommentResolver), // protectedResolver 적용
  },
};

export default resolvers;
