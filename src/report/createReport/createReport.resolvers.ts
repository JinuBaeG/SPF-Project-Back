import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 신고 생성 리졸버
const createReportResolver: Resolver = async (
  _,
  { photoId, boardId, noticeId, reportDescription, reportSortation },
  { loggedInUser }
) => {
  const createReport = await client.report.create({
    data: {
      user: {
        connect: {
          id: loggedInUser!.id, // Non-null assertion 사용
        },
      },
      ...(photoId && {
        photo: {
          connect: {
            id: photoId,
          },
        },
      }),
      ...(boardId && {
        board: {
          connect: {
            id: boardId,
          },
        },
      }),
      ...(noticeId && {
        notice: {
          connect: {
            id: noticeId,
          },
        },
      }),
      reportDescription, // 필드명 오타 수정 (reportDiscription -> reportDescription)
      reportSortation,
    },
  });

  return createReport?.id
    ? { ok: true }
    : { ok: false, error: "신고를 생성할 수 없습니다." };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    createReport: createReportResolver,
  },
};

export default resolvers;
