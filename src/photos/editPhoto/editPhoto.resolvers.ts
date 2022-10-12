import { protectedResolver } from "../../users/users.utils";
import { processHashtag } from "../photo.utils";

const editPhotoResolvers = async (
  _,
  { id, caption },
  { loggedInUser, client }
) => {
  const oldPhoto = await client.photo.findFirst({
    where: {
      id,
      userId: loggedInUser.id,
    },
    include: {
      hashtags: {
        select: {
          hashtag: true,
        },
      },
    },
  });
  if (!oldPhoto) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  await client.photo.update({
    where: {
      id,
    },
    data: {
      caption,
      hashtags: {
        disconnect: oldPhoto.hashtags,
        connectOrCreate: processHashtag(caption),
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editPhoto: protectedResolver(editPhotoResolvers),
  },
};
