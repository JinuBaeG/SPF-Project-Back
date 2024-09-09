import { Resolver, Resolvers } from "../../types";

// 피드 카테고리 수정 리졸버
const editFeedCategoryResolver: Resolver = async (
  _,
  { id, name, sortKey },
  { client }
) => {
  try {
    // 피드 카테고리 업데이트
    await client.feedCategoryList.update({
      data: {
        name,
        sortKey,
      },
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
      error: "피드 카테고리를 수정할 수 없습니다.",  // 명확한 에러 메시지
    };
  }
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    editFeedCategory: editFeedCategoryResolver,
  },
};

export default resolvers;
