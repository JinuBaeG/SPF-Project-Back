import { Resolvers } from "../../types";
import client from "../../client";

const resolvers: Resolvers = {
  Query: {
    seeBlockUsers: async (_, __, { loggedInUser }) => {
      if (!loggedInUser) {
        return {
          ok: false,
          error: "You need to log in to see blocked users.",
        };
      }

      const blockedUsers = await client.blockUser.findMany({
        where: {
          userId: loggedInUser.id,
        },
        include: {
          blockedBy: true,
          user: true,
        },
      });

      return {
        ok: true,
        blockedUsers,
      };
    },
  },
};

export default resolvers;
