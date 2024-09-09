import client from "../../client";
import { cryptFunction } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const searchContestUserResolver: Resolver = async (
  _: any,
  { email, username, phoneNumber }: { email?: string; username?: string; phoneNumber?: string }
) => {
  try {
    let uglyPhoneNumber;
    if (phoneNumber) {
      uglyPhoneNumber = cryptFunction(phoneNumber);
    }

    const users = await client.user.findMany({
      where: {
        ...(email && { email }),
        ...(username && { username }),
        ...(phoneNumber && { phoneNumber: uglyPhoneNumber }),
      },
    });

    return {
      ok: true,
      users,
    };
  } catch (error) {
    return {
      ok: false,
      error: "사용자 검색 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Query: {
    searchContestUser: searchContestUserResolver,
  },
};

export default resolvers;
