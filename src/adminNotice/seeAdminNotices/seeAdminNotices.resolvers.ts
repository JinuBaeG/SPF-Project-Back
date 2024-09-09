import { Resolvers } from "../../types";

const seeAdminNoticesResolvers: Resolvers = {
  Query: {
    seeAdminNotices: async (_, { offset }, { client }) => {
      try {
        const notices = await client.adminNotice.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 10, // 페이지네이션이 필요하다면 예시로 10개씩 가져오기
          skip: offset, // `offset`으로 몇 개를 건너뛸지 결정
        });

        return {
          ok: true,
          notices,
        };
      } catch (error) {
        console.error("공지사항 조회 중 오류:", error);
        return {
          ok: false,
          error: "공지사항 조회 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default seeAdminNoticesResolvers;
