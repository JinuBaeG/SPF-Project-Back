import client from "../../client";
import { uploadToAWS } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";

const uploadPhotoResolvers = async (
  _,
  { files, caption, sortation },
  { loggedInUser }
) => {
  const imagePath = await uploadToAWS(files, loggedInUser.id, sortation);

  return client.photo.create({
    data: {
      ...(imagePath.length > 0 && {
        feedUpload: {
          connectOrCreate: imagePath,
        },
      }),
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver(uploadPhotoResolvers),
  },
};
