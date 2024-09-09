import { Resolver, Resolvers } from "../../types";

const seeGroupTagResolver: Resolver = async (_, { offset }, { client }) => {
  try {
    const groupTags = await client.groupTag.findMany({
      take: 10, // 한 번에 10개의 태그를 가져옴
      skip: offset,
      orderBy: {
        id: "desc",
      },
    });

    return {
      ok: true,
      groupTags,
    };
  } catch (error) {
    console.error("그룹 태그 조회 실패:", error);
    return {
      ok: false,
      error: "그룹 태그를 불러오는 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Query: {
    seeGroupTag: seeGroupTagResolver,
  },
};

export default resolvers;
