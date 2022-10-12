import { protectedResolver } from "../users.utils";

const followUserResolovers = async (
  _,
  { username },
  { loggedInUser, client }
) => {
  const ok = await client.user.findUnique({ where: { username } });
  if (!ok) {
    return {
      ok: false,
      error: "That User " + username + " does not exist.",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        connect: {
          username,
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
    followUser: protectedResolver(followUserResolovers),
  },
};
