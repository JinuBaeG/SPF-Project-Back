import { protectedResolver } from "../../users/users.utils";

const seeFeedResolver = async (_, __, { loggedInUser, client }) => {
  return await client.photo.findMany({
    where: {
      OR: [
        {
          user: {
            followers: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        {
          userId: loggedInUser.id,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default {
  Query: {
    seeFeed: protectedResolver(seeFeedResolver),
  },
};
