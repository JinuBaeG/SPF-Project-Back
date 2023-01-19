import { protectedResolver } from "../../users/users.utils";

const joinDeniedResolver = async (_, { id, groupId }, { client }) => {
  await client.groupJoinRequest.delete({
    where: {
      groupId,
      userId: id,
    },
  });

  return {
    ok: true,
  };
};

export default {
  Mutation: {
    joinDenied: joinDeniedResolver,
  },
};
