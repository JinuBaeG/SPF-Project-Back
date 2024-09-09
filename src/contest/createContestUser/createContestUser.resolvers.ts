import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const createContestUserResolver: Resolver = async (
  _,
  {
    teamName,
    userAge,
    userGender,
    userTier,
    contestSports,
    contestSportsType,
    contestId,
    userId,
  }
) => {
  const date = Date.now();
  const contestPaymentId = "PI" + date;

  try {
    const contestUser = await client.contestUser.create({
      data: {
        userAge: parseInt(userAge),
        userGender,
        userTier,
        contestSports,
        contestSportsType,
        contestPaymentId,
        ...(contestId && {
          contest: {
            connect: {
              contestId,
            },
          },
        }),
        ...(userId && {
          user: {
            connect: {
              id: userId,
            },
          },
        }),
        ...(teamName && {
          contestTeam: {
            connectOrCreate: {
              where: {
                teamName_contestId: {
                  contestId,
                  teamName,
                },
              },
              create: {
                contestId,
                teamName,
              },
            },
          },
        }),
      },
    });

    await client.contestTeam.update({
      where: {
        teamName_contestId: {
          contestId,
          teamName,
        },
      },
      data: {
        ...(contestId && {
          contest: {
            connect: {
              contestId,
            },
          },
        }),
      },
    });

    return {
      ok: true,
      id: contestUser.id,
    };
  } catch (error) {
    return {
      ok: false,
      error: "사용자 생성 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    createContestUser: createContestUserResolver,
  },
};

export default resolvers;
