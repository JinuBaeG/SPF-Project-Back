import { protectedResolver } from "../../users/users.utils";

const seeMyGroupResolver = (_, { offset }, { loggedInUser, client }) => {
  return client.group.findMany({
    take: 3,
    skip: offset,
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });
};

export default {
  Query: {
    seeMyGroup: protectedResolver(seeMyGroupResolver),
  },
};
