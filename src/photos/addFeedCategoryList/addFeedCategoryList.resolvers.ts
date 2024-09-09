import { Resolver, Resolvers } from "../../types";

// 피드 카테고리 추가 리졸버
const addFeedCategoryResolver: Resolver = async (_, { name, sortKey }, { client }) => {
  const newFeedCategory = await client.feedCategoryList.create({
    data: {
      name,
      sortKey,
    },
  });

  return {
    ok: true,
    id: newFeedCategory.id,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    addFeedCategory: addFeedCategoryResolver,
  },
};

export default resolvers;
