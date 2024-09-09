import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const deleteCommentResolver: Resolver = async (
  _,
  { id },
  { loggedInUser, client }
) => {
  // loggedInUser가 없는 경우 처리
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  const comment = await client.comment.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  if (!comment) {
    return {
      ok: false,
      error: "댓글이 존재하지 않습니다.",
    };
  } else if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "삭제할 권한이 없습니다.",
    };
  } else {
    const recomment = await client.reComment.findMany({
      where: {
        commentId: id,
      },
    });
    if (recomment.length === 0) {
      await client.comment.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: `답글이 존재하여 삭제할 수 없습니다.`,
      };
    }
  }
};

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(deleteCommentResolver),
  },
};

export default resolvers;
