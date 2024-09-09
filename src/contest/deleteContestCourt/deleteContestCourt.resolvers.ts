import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// Court ID를 포함한 객체 배열의 타입 정의
interface CourtIdItem {
  id: string;
}

// resolver 함수 정의
const deleteContestCourtResolver: Resolver = async (
  _: any,
  { ids }: { ids: CourtIdItem[] }
) => {
  // 모든 삭제 작업을 비동기로 처리하여 Promise.all로 관리
  await Promise.all(
    ids.map(async (item: CourtIdItem) => {
      await client.contestCourt.delete({
        where: {
          id: item.id,
        },
      });
    })
  );

  return {
    ok: true,
  };
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteContestCourt: deleteContestCourtResolver,
  },
};

export default resolvers;
