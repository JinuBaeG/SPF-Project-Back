import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const deleteContestNoticeResolver: Resolver = async (
  _: any,
  { id }: { id: string }
) => {
  try {
    await client.contestNotice.delete({
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
      error: "삭제할 수 없습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteContestNotice: deleteContestNoticeResolver,
  },
};

export default resolvers;
