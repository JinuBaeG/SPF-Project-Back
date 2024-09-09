import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const deleteContestUserResolver: Resolver = async (
  _: any,
  { ids }: { ids: { id: string }[] }
) => {
  try {
    // map을 사용하여 Promise.all로 모든 삭제 작업을 처리
    await Promise.all(
      ids.map(async (item) => {
        await client.contestUser.delete({
          where: {
            id: item.id,
          },
        });
      })
    );
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "유저 삭제 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteContestUser: deleteContestUserResolver,
  },
};

export default resolvers;
