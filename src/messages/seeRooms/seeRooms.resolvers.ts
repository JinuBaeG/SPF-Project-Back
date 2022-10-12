import { protectedResolver } from "../../users/users.utils";

const seeRoomsResolver = async (_, __, { loggedInUser, client }) => {
  const rooms = await client.room.findMany({
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });
  return rooms;
};

export default {
  Query: {
    seeRooms: protectedResolver(seeRoomsResolver),
  },
};
