import client from "../client";
import { protectedResolver } from "../users/users.utils";
import { Resolver, Resolvers } from "../types";

// 사용자 조회 리졸버
const userResolver: Resolver = ({ userId }) => {
  return client.user.findUnique({
    where: { id: userId },
  });
};

// 그룹 조회 리졸버
const groupResolver: Resolver = ({ groupId }) => {
  if (groupId === null || groupId === undefined) {
    return null;
  }
  return client.group.findUnique({
    where: { id: groupId },
  });
};

// 튜터 조회 리졸버
const tutorResolver: Resolver = ({ tutorId }) => {
  if (tutorId === null || tutorId === undefined) {
    return null;
  }
  return client.tutor.findUnique({
    where: { id: tutorId },
  });
};

// 좋아요 수 리졸버
const likesResolver: Resolver = ({ id }) => {
  return client.noticeLike.count({
    where: { noticeId: id },
  });
};

// 댓글 수 리졸버
const noticeCommentCountResolver: Resolver = ({ id }) => {
  return client.noticeComment.count({
    where: { noticeId: id },
  });
};

// 댓글 목록 리졸버
const noticeCommentsResolver: Resolver = ({ id }) => {
  return client.noticeComment.findMany({
    where: { noticeId: id },
    include: { user: true },
  });
};

// 본인 여부 확인 리졸버
const isMineResolver: Resolver = protectedResolver(({ userId }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  return userId === loggedInUser.id;
});

// 좋아요 여부 확인 리졸버
const isLikedResolver: Resolver = async ({ id }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  const like = await client.noticeLike.findUnique({
    where: {
      noticeId_userId: {
        noticeId: id,
        userId: loggedInUser.id,
      },
    },
    select: { id: true },
  });
  return !!like;
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Notice: {
    user: userResolver,
    group: groupResolver,
    tutor: tutorResolver,
    likes: likesResolver,
    noticeCommentCount: noticeCommentCountResolver,
    noticeComments: noticeCommentsResolver,
    isMine: isMineResolver,
    isLiked: isLikedResolver,
  },
};

export default resolvers;
