import { Resolver } from "../../types";
import { protectedResolver } from "../users.utils";

const followUserResolvers: Resolver = async (
  _,
  { email }: { email: string }, // email을 입력받아 처리
  { loggedInUser, client }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "You need to be logged in to follow someone.",
    };
  }

  // email을 기반으로 사용자를 찾습니다.
  const userToFollow = await client.user.findUnique({
    where: { email }, // email을 고유 식별자로 사용
  });

  if (!userToFollow) {
    return {
      ok: false,
      error: `User with email ${email} does not exist.`,
    };
  }

  // 본인을 팔로우하지 못하도록 제한
  if (userToFollow.id === loggedInUser.id) {
    return {
      ok: false,
      error: "You cannot follow yourself.",
    };
  }

  // following 관계 업데이트
  await client.user.update({
    where: {
      id: loggedInUser.id, // loggedInUser의 id로 팔로잉 연결
    },
    data: {
      following: {
        connect: {
          id: userToFollow.id, // userToFollow의 id를 사용해 연결
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
    followUser: protectedResolver(followUserResolvers),
  },
};
