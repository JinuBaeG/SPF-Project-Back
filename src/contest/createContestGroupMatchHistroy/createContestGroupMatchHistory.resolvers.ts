import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const createContestGroupMatchHistoryResolver: Resolver = async (
  _,
  { contestId, contestTeam, contestMatchGroupId },
  { client }
) => {
  const contestTeamList = await client.contestTeam.findMany({
    where: {
      contestMatchGroupId,
    },
  });

  const contestMatchHistory = await client.contestGroupMatchHistory.findMany({
    where: {
      contestMatchGroupId,
    },
  });

  const contestMatchResult = await client.contestGroupMatchResult.findMany({
    where: {
      contestMatchGroupId,
    },
  });

  // 명시적 타입 지정
  if (
    contestTeamList.length < 1 &&
    contestMatchHistory.length < 1 &&
    contestMatchResult.length < 1
  ) {
    await Promise.all(contestTeam.map(async (team: { id: string }) => {
      await Promise.all(contestTeam.map(async (opponentTeam: { id: string }) => {
        if (team.id !== opponentTeam.id) {
          await client.contestGroupMatchHistory.create({
            data: {
              contestId,
              contestTeamId: team.id,
              opponentTeamId: opponentTeam.id,
              contestMatchGroupId: contestMatchGroupId,
            },
          });
        }
      }));
      await client.contestMatchGroup.update({
        where: {
          id: contestMatchGroupId,
        },
        data: {
          contestTeam: {
            connect: {
              id: team.id,
            },
          },
        },
      });

      await client.contestGroupMatchResult.create({
        data: {
          contest: {
            connect: {
              contestId,
            },
          },
          contestMatchGroup: {
            connect: {
              id: contestMatchGroupId,
            },
          },
          contestTeam: {
            connect: {
              id: team.id,
            },
          },
        },
      });
    }));
  } else {
    // 명시적 타입 지정
    await Promise.all(contestMatchHistory.map(async (item: { id: string }) => {
      await client.contestGroupMatchHistory.delete({
        where: {
          id: item.id,
        },
      });
    }));

    await Promise.all(contestMatchResult.map(async (item: { id: string }) => {
      await client.contestGroupMatchResult.delete({
        where: {
          id: item.id,
        },
      });
    }));

    contestTeamList.map((item: { id: string }) => {
      contestTeam.push({ id: item.id });
    });

    setTimeout(async () => {
      await Promise.all(contestTeam.map(async (team: { id: string }) => {
        await Promise.all(contestTeam.map(async (opponentTeam: { id: string }) => {
          if (team.id !== opponentTeam.id) {
            await client.contestGroupMatchHistory.create({
              data: {
                contestId,
                contestTeamId: team.id,
                opponentTeamId: opponentTeam.id,
                contestMatchGroupId: contestMatchGroupId,
              },
            });
          }
        }));
        await client.contestMatchGroup.update({
          where: {
            id: contestMatchGroupId,
          },
          data: {
            contestTeam: {
              connect: {
                id: team.id,
              },
            },
          },
        });

        await client.contestGroupMatchResult.create({
          data: {
            contest: {
              connect: {
                contestId,
              },
            },
            contestMatchGroup: {
              connect: {
                id: contestMatchGroupId,
              },
            },
            contestTeam: {
              connect: {
                id: team.id,
              },
            },
          },
        });
      }));
    }, 100);
  }

  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    createContestGroupMatchHistory: createContestGroupMatchHistoryResolver,
  },
};

export default resolvers;
