import { protectedResolver } from "../../users/users.utils";

const seeGroupsResolver = (_, { offset }, { client }) => {
  return client.group.findMany({
    take: 3,
    skip: offset,
  });
};

export default {
  Query: {
    seeGroups: seeGroupsResolver,
  },
};
