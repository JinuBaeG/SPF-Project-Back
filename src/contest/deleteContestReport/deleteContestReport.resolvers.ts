import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const deleteContestReportResolver: Resolver = async (
  _: any,
  { id }: { id: string }
) => {
  try {
    await client.contestReport.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "리포트를 삭제할 수 없습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteContestReport: deleteContestReportResolver,
  },
};

export default resolvers;
