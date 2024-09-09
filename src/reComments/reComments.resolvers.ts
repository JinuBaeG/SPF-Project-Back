import { Resolver, Resolvers } from "../types";

// 리댓글의 소유 여부 확인 리졸버
const isMineResolver: Resolver = ({ userId }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false;
  }
  return userId === loggedInUser.id;
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  ReComment: {
    isMine: isMineResolver,
  },
};

export default resolvers;
