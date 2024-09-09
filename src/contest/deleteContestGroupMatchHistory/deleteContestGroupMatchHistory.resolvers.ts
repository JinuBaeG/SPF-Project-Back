import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const deleteContestGroupMatchTeamResolver: Resolver = async (
  _: any,
  {
    contestId,
    contestTeamId,
    contestMatchGroupId,
  }: { contestId: string; contestTeamId: string; contestMatchGroupId: string }
) => {
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

  // 매핑된 삭제 작업을 비동기 처리
  await Promise.all(
    contestMatchHistory.map((item) =>
      client.contestGroupMatchHistory.delete({
        where: {
          id: item.id,
        },
      })
    )
  );

  await Promise.all(
    contestMatchResult.map((item) =>
      client.contestGroupMatchResult.delete({
        where: {
          id: item.id,
        },
      })
    )
  );

  // 팀 연결 해제
  await client.contestMatchGroup.update({
    where: {
      id: contestMatchGroupId,
    },
    data: {
      contestTeam: {
        disconnect: { id: contestTeamId },
      },
    },
  });

  const contestTeam = await client.contestTeam.findMany({
    where: {
      contestMatchGroupId,
    },
  });

  if (contestTeam.length > 0) {
    // 각 팀을 순회하며 매칭 생성
    contestTeam.map(async (team) => {
      contestTeam.map(async (opponentTeam) => {
        if (team.id !== opponentTeam.id) {
          await client.contestGroupMatchHistory.create({
            data: {
              contestId,
              contestTeamId: team.id,
              opponentTeamId: opponentTeam.id,
              contestMatchGroupId,
            },
          });
        }
      });

      await client.contestGroupMatchResult.create({
        data: {
          contest: {
            connect: {
              contestId,
            },
          },
          contestTeam: {
            connect: {
              id: team.id,
            },
          },
          contestMatchGroup: {
            connect: {
              id: contestMatchGroupId,
            },
          },
        },
      });
    });
  }

  return {
    ok: true,
  };
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    deleteContestGroupMatchTeam: deleteContestGroupMatchTeamResolver,
  },
};

export default resolvers;
