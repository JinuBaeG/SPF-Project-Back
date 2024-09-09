import { Resolver, Resolvers } from "../types";

const isMineResolver: Resolver = (
  { userId }: { userId: string }, // userId의 타입을 명시적으로 지정
  _: any,
  { loggedInUser }: { loggedInUser?: any } // loggedInUser를 선택적으로 변경
) => {
  if (!loggedInUser) {
    return false;
  }
  return userId === loggedInUser.id;
};

const resolvers: Resolvers = {
  BoardReComment: {
    isMine: isMineResolver,
  },
};

export default resolvers;
