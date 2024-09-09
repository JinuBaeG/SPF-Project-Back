import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const editContestReportResolver: Resolver = async (
  _: any,
  { id, contestId, reportTitle, reportDescription }: { id: string; contestId: string; reportTitle: string; reportDescription: string }
) => {
  try {
    // 리포트 업데이트
    await client.contestReport.update({
      where: {
        id,
      },
      data: {
        reportTitle,
        reportDescription,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "리포트 수정 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    editContestReport: editContestReportResolver,
  },
};

export default resolvers;
