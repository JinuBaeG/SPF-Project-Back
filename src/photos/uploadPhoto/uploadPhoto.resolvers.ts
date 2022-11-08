import client from "../../client";
import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import { processHashtag } from "../photo.utils";

const uploadPhotoResolvers = async (_, { file, caption }, { loggedInUser }) => {
  let hashtagObjs = [];
  if (caption) {
    hashtagObjs = processHashtag(caption);
  }
  const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
  console.log(fileUrl);
  return client.photo.create({
    data: {
      file: fileUrl,
      caption,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(hashtagObjs.length > 0 && {
        hashtags: {
          connectOrCreate: hashtagObjs,
        },
      }),
    },
  });
};

export default {
  Mutation: {
    uploadPhoto: protectedResolver(uploadPhotoResolvers),
  },
};
