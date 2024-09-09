import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (
      _,
      { keyword, lastId }: { keyword: string; lastId?: string },
      { client }
    ) => {
      const users = await client.user.findMany({
        where: {
          OR: [
            {
              username: {
                startsWith: keyword.toLowerCase(),
              },
            },
          ],
        },
        take: 5,
        skip: lastId ? 1 : 0,
        cursor: lastId ? { id: lastId } : undefined,
      });

      return {
        ok: true,
        users,
      };
    },
  },
};

export default resolvers;
