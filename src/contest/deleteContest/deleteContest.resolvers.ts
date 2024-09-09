import client from "../../client";

// contestId가 포함된 객체 배열 타입 정의
interface ContestIdItem {
  contestId: string;
}

const deleteContestResolver = async (
  _: any, 
  { ids }: { ids: ContestIdItem[] }
) => {
  // Promise.all을 사용해 모든 삭제 작업이 완료될 때까지 기다립니다.
  await Promise.all(
    ids.map(async (item: ContestIdItem) => {
      await client.contest.delete({
        where: {
          contestId: item.contestId,
        },
      });
    })
  );

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    deleteContest: deleteContestResolver,
  },
};
