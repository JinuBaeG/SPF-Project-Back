import client from "../client";
import { Resolver, Resolvers } from "../types";

// 댓글이 본인 것인지 확인하는 리졸버
const isMineResolver: Resolver = ({ userId }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  return userId === loggedInUser.id;
};

// 답글 목록을 가져오는 리졸버
const noticeReCommentsResolver: Resolver = ({ id }) => {
  return client.noticeReComment.findMany({
    where: {
      noticeCommentId: id,
    },
    include: {
      user: true,
    },
  });
};

// 답글 수를 가져오는 리졸버
const noticeReCommentCountResolver: Resolver = ({ id }) => {
  return client.noticeReComment.count({
    where: {
      noticeCommentId: id,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  NoticeComment: {
    isMine: isMineResolver,
    noticeReComments: noticeReCommentsResolver,
    noticeReCommentCount: noticeReCommentCountResolver,
  },
};

export default resolvers;
