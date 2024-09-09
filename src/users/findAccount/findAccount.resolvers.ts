import { User } from "@prisma/client"; // Prisma Client에서 자동 생성된 User 타입
import { Context } from "../../types"; // Context 타입 정의 필요
import client from "../../client";

const findAccountResolvers = async (
  _: any,
  { email }: { email: string },
  { client }: Context
): Promise<User | null> => {
  const result = await client.user.findUnique({
    where: {
      email: email,
    },
  });

  return result;
};

export default {
  Query: {
    findAccountFromEmail: findAccountResolvers,
  },
};
