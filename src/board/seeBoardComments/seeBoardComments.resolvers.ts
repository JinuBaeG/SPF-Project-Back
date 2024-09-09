import { Resolver, Resolvers } from "../../types";

const seeBoardCommentsResolver: Resolver = async (_, { id, offset }, { client }) => {
  try {
    const comments = await client.boardComment.findMany({
      take: 5,
      skip: offset,
      where: {
        boardId: id,
      },
      include: {
        user: true,
        board: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      ok: true,
      comments,
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return {
      ok: false,
      error: "댓글 조회 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeBoardComments: seeBoardCommentsResolver,
  },
};

export default resolvers;
