import client from "../../client";
import { uploadToAWS } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 사진 업로드 리졸버
const uploadPhotoResolver: Resolver = async (
  _,
  { files, caption, sortation, publicLevel, sportsEvent, feedCategory },
  { loggedInUser }
) => {
  let imagePaths: string[] = []; // 명시적으로 string[] 타입 지정

  // 파일이 있는 경우 AWS에 업로드
  if (files) {
    imagePaths = await uploadToAWS(files, loggedInUser!.id, sortation); // Non-null assertion 사용
  }

  // Prisma가 기대하는 형태로 feedUpload를 구성
  const feedUploads = imagePaths.map((path) => ({
    url: path, // FeedUpload에 맞는 필드로 매핑
    imagePath: path, // 'imagePath' 필드 추가 (Prisma 스키마에 정의된 필드에 맞춰줌)
  }));

  // 사진 데이터 생성
  return client.photo.create({
    data: {
      ...(feedUploads.length > 0 && {
        feedUpload: {
          create: feedUploads, // 'create'를 사용하여 FeedUpload 객체 배열 생성
        },
      }),
      caption,
      publicLevel,
      sportsEvent,
      feedCategory,
      user: {
        connect: {
          id: loggedInUser!.id, // Non-null assertion 사용
        },
      },
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(uploadPhotoResolver), // protectedResolver 적용
  },
};

export default resolvers;
