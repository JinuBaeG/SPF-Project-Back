import { Resolver, Resolvers } from "../../types";

// 피드 카테고리 목록 조회 리졸버
const seeFeedCategoryListResolver: Resolver = async (_, __, { client }) => {
  return client.feedCategoryList.findMany({
    orderBy: {
      id: "asc",  // ID 오름차순으로 정렬
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seeFeedCategoryList: seeFeedCategoryListResolver,
  },
};

export default resolvers;
