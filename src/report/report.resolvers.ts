import { Resolver, Resolvers } from "../types";
import client from "../client";

// 신고 관련 리졸버
const reportResolvers: Resolvers = {
  Report: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: { id: userId },
      });
    },
    photo: ({ photoId }) => {
      return photoId
        ? client.photo.findUnique({
            where: { id: photoId },
          })
        : null;
    },
    board: ({ boardId }) => {
      return boardId
        ? client.board.findUnique({
            where: { id: boardId },
          })
        : null;
    },
    notice: ({ noticeId }) => {
      return noticeId
        ? client.notice.findUnique({
            where: { id: noticeId },
          })
        : null;
    },
  },
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  ...reportResolvers,
};

export default resolvers;
