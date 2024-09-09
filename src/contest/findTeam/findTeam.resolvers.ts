import client from "../../client";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const findTeamResolver: Resolver = async (
  _: any,
  { contestId, teamName }: { contestId: string; teamName: string }
) => {
  try {
    const isTeam = await client.contestTeam.findFirst({
      where: {
        contestId,
        teamName,
      },
    });

    let team;
    if (isTeam !== null) {
      team = await client.contestTeam.findUnique({
        where: {
          id: isTeam.id,
        },
        include: {
          contestUser: true,
          _count: {
            select: {
              contestUser: true,
            },
          },
        },
      });
    }

    if (team) {
      if (team._count.contestUser === 1 && team.contestUser[0].userId) {
        const user = await client.user.findUnique({
          where: {
            id: team.contestUser[0].userId as string, // userId가 null이 아님을 보장
          },
        });

        return {
          ok: true,
          info: `${team.teamName}의 멤버가 맞습니까? 팀원 : ${user?.username}`,
        };
      } else if (team._count.contestUser === 2) {
        return {
          ok: false,
          info: `이미 ${team.teamName} 팀이 존재합니다.`,
        };
      } else if (team._count.contestUser === 0) {
        return {
          ok: true,
          info: "사용할 수 있는 팀명 입니다.",
        };
      }
    } else {
      return {
        ok: true,
        info: "사용할 수 있는 팀명 입니다.",
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: "팀을 찾는 도중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    findTeam: findTeamResolver,
  },
};

export default resolvers;
