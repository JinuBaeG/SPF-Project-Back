import { Resolver, Resolvers } from "../../types";

const seeBoardResolver: Resolver = async (_, { id }, { client }) => {
  try {
    // 조회수 증가
    await client.board.update({
      where: {
        id,
      },
      data: {
        hits: {
          increment: 1,
        },
      },
    });

    // 게시물 가져오기
    const board = await client.board.findUnique({
      where: {
        id,
      },
    });

    if (!board) {
      return {
        ok: false,
        error: "게시물이 존재하지 않습니다.",
      };
    }

    return {
      ok: true,
      board,
    };
  } catch (error) {
    console.error("Error fetching board:", error);
    return {
      ok: false,
      error: "게시물 조회 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeBoard: seeBoardResolver,
  },
};

export default resolvers;
