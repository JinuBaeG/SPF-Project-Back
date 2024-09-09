import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 리댓글 수정 리졸버
const editReCommentResolver: Resolver = async (
  _,
  { id, payload },
  { loggedInUser, client }
) => {
  // 리댓글 존재 여부 확인
  const reComment = await client.reComment.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!reComment) {
    return {
      ok: false,
      error: "댓글을 찾을 수 없습니다.",
    };
  }

  // 권한이 없는 경우 처리
  if (reComment.userId !== loggedInUser!.id) { // Non-null assertion 사용
    return {
      ok: false,
      error: "권한이 없습니다.",
    };
  }

  // 리댓글 수정
  await client.reComment.update({
    where: { id },
    data: { payload },
  });

  return {
    ok: true,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    editReComment: protectedResolver(editReCommentResolver), // protectedResolver 적용
  },
};

export default resolvers;
