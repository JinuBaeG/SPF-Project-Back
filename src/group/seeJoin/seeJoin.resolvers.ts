import { protectedResolver } from "../../users/users.utils";

const seeJoinResolver = async (_, { id }, { client }) => {
  return await client.groupJoinRequest.findMany({
    where: {
      groupId: id,
    },
  });
};

export default {
  Query: {
    seeJoin: protectedResolver(seeJoinResolver),
  },
};
