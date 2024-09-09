import { protectedResolver } from "../../users/users.utils";
import { Resolver } from "../../types";

const createBoardResolver: Resolver = async (
  _,
  { id, title, description, sortation },
  { loggedInUser, client }
) => {
  // loggedInUser가 null 또는 undefined일 경우 처리
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  let sortationLink;

  if (sortation === "group") {
    sortationLink = {
      title,
      group: { connect: { id } },
      user: {
        connect: { id: loggedInUser.id },
      },
      description,
      sortation,
    };
  } else if (sortation === "tutor") {
    sortationLink = {
      title,
      tutor: { connect: { id } },
      user: {
        connect: { id: loggedInUser.id },
      },
      description,
      sortation,
    };
  } else {
    return {
      ok: false,
      error: "유효하지 않은 정렬 기준입니다.",
    };
  }

  try {
    const board = await client.board.create({
      data: sortationLink,
    });

    return {
      ok: true,
      board,
    };
  } catch (error) {
    console.error("Error creating board:", error);
    return {
      ok: false,
      error: "게시물 생성 중 오류가 발생했습니다.",
    };
  }
};

export default {
  Mutation: {
    createBoard: protectedResolver(createBoardResolver),
  },
};
