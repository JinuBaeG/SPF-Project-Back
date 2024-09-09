import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const boardToggleLikeResolver: Resolver = async (
  _,
  { id },
  { loggedInUser, client }
) => {
  // loggedInUser가 null 또는 undefined일 경우 처리
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  try {
    const board = await client.board.findUnique({
      where: {
        id,
      },
    });

    if (!board) {
      return {
        ok: false,
        error: "게시물을 찾을 수 없습니다.",
      };
    }

    const likeWhere = {
      boardId_userId: {
        userId: loggedInUser.id,
        boardId: id,
      },
    };

    const like = await client.boardLike.findUnique({
      where: likeWhere,
    });

    if (like) {
      await client.boardLike.delete({
        where: likeWhere,
      });
    } else {
      await client.boardLike.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          board: {
            connect: {
              id: board.id,
            },
          },
        },
      });
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error toggling like on board:", error);
    return {
      ok: false,
      error: "좋아요 토글 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    boardToggleLike: protectedResolver(boardToggleLikeResolver),
  },
};

export default resolvers;
