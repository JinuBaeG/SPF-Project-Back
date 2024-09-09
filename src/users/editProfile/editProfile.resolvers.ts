import * as bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.util";
import { Resolver } from "../../types"; // 필요에 따라 정의된 Resolver 타입을 사용

const editProfileResolver: Resolver = async (
  _,
  { id, username, avatar, gender },
  { loggedInUser, client }
) => {
  // loggedInUser가 null이거나 undefined인 경우 early return
  if (!loggedInUser) {
    return {
      ok: false,
      error: "User is not authenticated.",
    };
  }

  let avatarUrl: string | null = null;

  if (avatar) {
    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
  }

  const updateUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      id,
      username,
      avatar,
      gender,
      ...(avatarUrl && { avatar: avatarUrl }), // avatarUrl이 있을 경우만 업데이트
    },
  });

  if (updateUser.id) {
    return {
      id: loggedInUser.id,
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not Edit Profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(editProfileResolver),
  },
};
