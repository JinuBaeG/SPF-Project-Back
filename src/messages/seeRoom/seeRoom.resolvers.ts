import { protectedResolver } from "../../users/users.utils";

const seeRoomResolver = async (_, { id }, { loggedInUser, client }) => {
  const room = await client.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

  return room;
};

export default {
  Query: {
    seeRoom: protectedResolver(seeRoomResolver),
  },
};
