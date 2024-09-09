import { Resolver, Resolvers } from "../types";

// 소유 여부 확인 리졸버
const isMineResolver: Resolver = ({ userId }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  return userId === loggedInUser!.id;  // Non-null assertion 사용
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  NoticeReComment: {
    isMine: isMineResolver,
  },
};

export default resolvers;
