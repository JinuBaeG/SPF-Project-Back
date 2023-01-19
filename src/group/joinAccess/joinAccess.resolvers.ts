import { protectedResolver } from "../../users/users.utils";

const joinAccessResolver = async (_, { id, groupId }, { client }) => {
  await client.group.update({
    where: {
      id: groupId,
      users: {
        connect: {
          id,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    joinAccess: protectedResolver(joinAccessResolver),
  },
};
