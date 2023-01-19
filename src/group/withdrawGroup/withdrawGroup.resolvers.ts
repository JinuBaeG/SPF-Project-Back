import { protectedResolver } from "../../users/users.utils";

const withdrawGroupResolver = async (_, { id }, { loggedInUser, client }) => {
  const joinCheck = await client.group.findUnique({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

  if (!joinCheck) {
    return {
      ok: false,
      error: "가입되지 않은 그룹입니다.",
    };
  } else {
    await client.group.delete({
      where: {
        id,
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    withdrawGroup: protectedResolver(withdrawGroupResolver),
  },
};
