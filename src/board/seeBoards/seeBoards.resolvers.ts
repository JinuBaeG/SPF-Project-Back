import { blockBoardList } from "../../photos/photo.utils";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

const seeBoardsResolver: Resolver = async (
  _,
  { id, sortation, offset },
  { loggedInUser, client }
) => {
  try {
    // 로그인한 사용자가 차단한 유저 리스트 가져오기
    let blockUsers = await client.blockUser.findMany({
      where: {
        userId: loggedInUser?.id, // loggedInUser가 null일 수 있음으로 체크
      },
      select: { blockedById: true }, // blockedById로 수정
    });

    const blockedUserIds = blockUsers.map(block => block.blockedById); // 차단된 유저 ID 배열 생성

    let sortationWhere;
    if (sortation === "group") {
      sortationWhere = { groupId: id, sortation };
    } else if (sortation === "tutor") {
      sortationWhere = { tutorId: id, sortation };
    }

    // 블록된 유저의 게시물을 제외하여 필터링
    const boards = await client.board.findMany({
      take: 5,
      skip: offset,
      where: {
        ...sortationWhere,
        ...(blockedUserIds.length > 0 && {
          user: { // 'user'는 Board와 연결된 관계 필드
            id: { notIn: blockedUserIds }, // block된 유저의 게시물 제외
          },
        }),
      },
    });

    return {
      ok: true,
      boards,
    };
  } catch (error) {
    console.error("Error fetching boards:", error);
    return {
      ok: false,
      error: "게시판 조회 중 오류가 발생했습니다.",
    };
  }
};


const resolvers: Resolvers = {
  Query: {
    seeBoards: protectedResolver(seeBoardsResolver),
  },
};

export default resolvers;
