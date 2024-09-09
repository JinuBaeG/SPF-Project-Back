import client from "../../client";
import { uploadToAWS } from "../../shared/shared.util";
import { Resolver, Resolvers } from "../../types";

const createBugReportResolver: Resolver = async (
  _,
  { reportTitle, reportDescription, reportImage },
  { loggedInUser }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  let imagePaths: string[] = [];

  // 이미지가 있을 경우 AWS에 업로드
  if (reportImage) {
    imagePaths = await uploadToAWS(reportImage, loggedInUser.id, "BugReport");
  }

  // 버그 리포트 생성
  const bugReport = await client.bugReport.create({
    data: {
      reportTitle,
      reportDescription,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      // bugReportImage 배열에 이미지 경로가 있을 경우에만 생성
      ...(imagePaths.length > 0 && {
        bugReportImage: {
          create: imagePaths.map((imagePath) => ({
            imagePath, // 이미지 경로를 사용해 BugReportImage 생성
          })),
        },
      }),
    },
  });

  if (bugReport) {
    return {
      ok: true,
    };
  }

  return {
    ok: false,
    error: "버그 리포트 생성에 실패했습니다.",
  };
};

const resolvers: Resolvers = {
  Mutation: {
    createBugReport: createBugReportResolver,
  },
};

export default resolvers;
