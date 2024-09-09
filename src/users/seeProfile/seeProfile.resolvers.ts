import { Resolvers } from "../../types";
import { cryptFunction, deCryptFunction } from "../users.utils";

const seeProfileResolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { id }, { client }) => {
      const profile = await client.user.findUnique({
        where: {
          id,
        },
        include: {
          photos: true,
          group: true,
          tutor: true,
        },
      });

      if (!profile) {
        return {
          ok: false,
          error: "User not found",
        };
      }

      if (profile.phoneNumber) {
        profile.phoneNumber = deCryptFunction(profile.phoneNumber);
      }

      return {
        ok: true,
        profile,
      };
    },
  },
};

export default seeProfileResolvers;
