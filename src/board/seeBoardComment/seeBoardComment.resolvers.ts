import { Resolver, Resolvers } from "../../types";

const seeBoardCommentResolver: Resolver = async (_, { id }, { client }) => {
  try {
    const boardComment = await client.boardComment.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        board: true,
      },
    });

    if (!boardComment) {
      return {
        ok: false,
        error: "댓글을 찾을 수 없습니다.",
      };
    }

    return {
      ok: true,
      boardComment,
    };
  } catch (error) {
    console.error("Error fetching board comment:", error);
    return {
      ok: false,
      error: "댓글 조회 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeBoardComment: seeBoardCommentResolver,
  },
};

export default resolvers;
