import { deCryptFunction } from "../../users/users.utils";

const seeContestJoinCheckResolvers = async (
  _: any,
  { contestId, userId }: { contestId: string; userId: string },
  { client }: { client: any }
) => {
  const contestUser = await client.contestUser.findUnique({
    where: {
      contestId_userId: {
        contestId,
        userId,
      },
    },
    include: {
      user: true,
      contest: true,
      contestTeam: true,
    },
  });

  if (!contestUser) {
    return {
      ok: false,
      error: "참가자를 찾을 수 없습니다.",
    };
  }

  // 안전하게 user와 phoneNumber를 확인하고 복호화
  const decryptedPhoneNumber = contestUser.user?.phoneNumber
    ? deCryptFunction(contestUser.user.phoneNumber)
    : null;

  // 새로운 객체로 안전하게 반환
  return {
    ok: true,
    contestUser: {
      ...contestUser,
      user: {
        ...contestUser.user,
        phoneNumber: decryptedPhoneNumber,
      },
    },
  };
};

export default {
  Query: {
    seeContestJoinCheck: seeContestJoinCheckResolvers,
  },
};
