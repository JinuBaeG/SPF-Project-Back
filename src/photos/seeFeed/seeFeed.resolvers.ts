import { protectedResolver } from "../../users/users.utils";

const seeFeedResolver = async (_, { offset }, { loggedInUser, client }) => {
  return await client.photo.findMany({
    take: 2,
    skip: offset,
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
