// 해시태그 처리 함수
export const processHashtag = (caption: string) => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: { hashtag: hashtag.toLowerCase() },  // 해시태그를 소문자로 처리 (중복 방지)
    create: { hashtag: hashtag.toLowerCase() },
  }));
};

// 차단된 사용자 리스트 변환
export const blockUserList = (blockUserList: Array<{ blockedById: string }>) => {
  return blockUserList.map((item) => ({
    user: {
      id: item.blockedById,
    },
  }));
};

// 차단된 그룹 리스트 변환
export const blockGroupList = (blockUserList: Array<{ blockedById: string }>) => {
  return blockUserList.map((item) => ({
    users: {
      some: {
        id: item.blockedById,
      },
    },
  }));
};

// 차단된 게시판 리스트 변환
export const blockBoardList = (blockUserList: Array<{ blockedById: string }>) => {
  return blockUserList.map((item) => ({
    user: {
      some: {
        id: item.blockedById,
      },
    },
  }));
};
