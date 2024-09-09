import { Resolver, Resolvers } from "../../types";

const seeBoardReCommentsResolver: Resolver = async (_, { id, offset }, { client }) => {
  try {
    const reComments = await client.boardReComment.findMany({
      take: 5,
      skip: offset,
      where: {
        boardCommentId: id,
      },
      include: {
        user: true,
        boardComment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      ok: true,
      reComments,
    };
  } catch (error) {
    console.error("Error fetching re-comments:", error);
    return {
      ok: false,
      error: "대댓글 조회 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeBoardReComments: seeBoardReCommentsResolver,
  },
};

export default resolvers;
