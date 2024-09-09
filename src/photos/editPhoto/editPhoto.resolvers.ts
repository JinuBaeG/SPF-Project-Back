import { protectedResolver } from "../../users/users.utils";
import { processHashtag } from "../photo.utils";
import { Resolver, Resolvers } from "../../types";

// 사진 수정 리졸버
const editPhotoResolver: Resolver = async (
  _,
  { id, caption },
  { loggedInUser, client }
) => {
  // 기존 사진 조회
  const oldPhoto = await client.photo.findFirst({
    where: {
      id,
      userId: loggedInUser!.id,  // Non-null assertion 사용
    },
    include: {
      hashtags: {
        select: {
          hashtag: true,
        },
      },
    },
  });

  // 사진이 존재하지 않을 경우 처리
  if (!oldPhoto) {
    return {
      ok: false,
      error: "사진을 찾을 수 없습니다.",
    };
  }

  // 사진 업데이트
  await client.photo.update({
    where: { id },
    data: {
      caption,
      hashtags: {
        disconnect: oldPhoto.hashtags,  // 기존 해시태그 해제
        connectOrCreate: processHashtag(caption),  // 새로운 해시태그 처리
      },
    },
  });

  return {
    ok: true,
  };
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(editPhotoResolver),
  },
};

export default resolvers;
