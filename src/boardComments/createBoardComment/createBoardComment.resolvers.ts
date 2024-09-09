import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const createBoardCommentResolver: Resolver = async (
  _,
  { boardId, payload },
  { loggedInUser, client }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  const ok = await client.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      id: true,
    },
  });

  if (!ok) {
    return {
      ok: false,
      error: "게시물이 존재하지 않습니다.",
    };
  }

  const newComment = await client.boardComment.create({
    data: {
      payload,
      board: {
        connect: {
          id: boardId,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });

  return {
    ok: true,
    id: newComment.id,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    createBoardComment: protectedResolver(createBoardCommentResolver),
  },
};

export default resolvers;
