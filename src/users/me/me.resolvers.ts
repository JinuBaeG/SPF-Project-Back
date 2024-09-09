import { protectedResolver } from "../users.utils";

export default {
  Query: {
    me: protectedResolver((_, __, { loggedInUser, client }) => {
      
      if (!loggedInUser) {
        throw new Error("로그인 상태가 아닙니다.");
      }

      return client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
        include: {
          tutor: true,
          group: true,
          blocks: true, // User가 차단한 목록
          blockedBy: true, // User를 차단한 목록
        },
      });
    }),
  },
};
