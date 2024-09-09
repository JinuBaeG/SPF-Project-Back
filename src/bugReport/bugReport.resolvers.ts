import client from "../client";
import { Resolver, Resolvers } from "../types";

const bugReportUserResolver: Resolver = async ({ userId }, _, { client }) => {
  return await client.user.findUnique({
    where: {
      id: userId,
    },
  });
};

const resolvers: Resolvers = {
  BugReport: {
    user: bugReportUserResolver,
  },
};

export default resolvers;
