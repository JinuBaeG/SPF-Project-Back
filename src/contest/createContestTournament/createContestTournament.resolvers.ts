import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const createContestTournamentResolver: Resolver = async (
  _,
  { contestId, contestGroupId, totalRound, roundAdvance }
) => {
  let roundCount = 1;
  let matchCount = 1;
  let nextMatchId: string[] = [];
  let tournamentGroup;
  let nextMatchIndex = 0;
  let insertIndex = 0;

  try {
    await client.contestTierGroup.update({
      where: {
        id: contestGroupId,
      },
      data: {
        roundAdvance,
        startRound: totalRound,
      },
    });

    for (let i = 1; i < totalRound; i++) {
      if (totalRound === matchCount) {
        return {
          ok: true,
        };
      }

      for (let j = 0; j < matchCount; j++) {
        if (j % 2 === 0 && i > 2) {
          insertIndex++;
        }

        tournamentGroup = await client.contestTournamentGroup.create({
          data: {
            contest: {
              connect: {
                contestId,
              },
            },
            contestTierGroup: {
              connect: {
                id: contestGroupId,
              },
            },
            state: "NO_PARTY",
            name: roundCount.toString(),
            nextMatchId: nextMatchId[insertIndex],
            tournamentRoundText: roundCount.toString(),
          },
        });

        for (let k = 0; k < 2; k++) {
          await client.contestTournamentHistory.create({
            data: {
              status: "NO_PARTY",
              contest: {
                connect: {
                  contestId,
                },
              },
              contestTierGroup: {
                connect: {
                  id: contestGroupId,
                },
              },
              contestTournamentGroup: {
                connect: {
                  id: tournamentGroup.id,
                },
              },
            },
          });
        }
        nextMatchId[nextMatchIndex] = tournamentGroup.id;
        nextMatchIndex++;
      }

      matchCount *= 2;
      roundCount++;
    }
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: "토너먼트 생성 중 오류가 발생했습니다.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    createContestTournament: createContestTournamentResolver,
  },
};

export default resolvers;
