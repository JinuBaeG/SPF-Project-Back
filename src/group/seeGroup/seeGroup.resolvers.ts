import { protectedResolver } from "../../users/users.utils";

const seeGroupResolver = (_, { id }, { loggedInUser, client }) => {
  return client.group.findUnique({
    where: {
      id,
    },
  });
};

export default {
  Query: {
    seeGroup: protectedResolver(seeGroupResolver),
  },
};
