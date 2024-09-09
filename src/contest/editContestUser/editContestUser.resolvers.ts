import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const editContestUserResolver: Resolver = async (
  _: any,
  {
    id,
    contestId,
    teamName,
    userAge,
    userGender,
    userTier,
    contestSports,
    contestSportsType,
  }: {
    id: string;
    contestId: string;
    teamName?: string;
    userAge: number;
    userGender: string;
    userTier: string;
    contestSports: string;
    contestSportsType: string;
  }
) => {
  try {
    await client.contestUser.update({
      where: {
        id,
      },
      data: {
        userAge,
        userGender,
        userTier,
        contestSports,
        contestSportsType,
        ...(teamName && {
          contestTeam: {
            connectOrCreate: {
              where: {
                teamName_contestId: {
                  contestId,
                  teamName,
                },
              },
              create: { contestId, teamName },
            },
          },
        }),
      },
    });
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "사용자 정보를 수정하는 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    editContestUser: editContestUserResolver,
  },
};

export default resolvers;
