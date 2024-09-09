import { protectedResolver } from "../../users/users.utils";
import { Resolver } from "../../types";

const deleteBoardResolver: Resolver = async (
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

  const board = await client.board.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });

  if (!board) {
    return {
      ok: false,
      error: "게시물이 존재하지 않습니다.",
    };
  }

  if (board.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "게시물을 삭제할 권한이 없습니다.",
    };
  }

  try {
    await client.board.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.error("Error deleting board:", error);
    return {
      ok: false,
      error: "게시물 삭제 중 오류가 발생했습니다.",
    };
  }
};

export default {
  Mutation: {
    deleteBoard: protectedResolver(deleteBoardResolver),
  },
};
