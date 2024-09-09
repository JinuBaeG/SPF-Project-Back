import { protectedResolver } from "../../users/users.utils";
import { Resolver } from "../../types";

const createNoticeResolver: Resolver = async (
  _,
  { id, title, description, sortation }, // 'discription'을 'description'으로 수정
  { loggedInUser, client }
) => {
  // 로그인 여부 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }
  
  let sortationLink;

  if (sortation === "group") {
    sortationLink = {
      title,
      group: { connect: { id } }, // group에 연결
      user: { connect: { id: loggedInUser.id } }, // 작성한 유저 연결
      description, // 'discription'을 'description'으로 수정
      sortation,
    };
  } else if (sortation === "tutor") {
    sortationLink = {
      title,
      tutor: { connect: { id } }, // tutor에 연결
      user: { connect: { id: loggedInUser.id } }, // 작성한 유저 연결
      description, // 'discription'을 'description'으로 수정
      sortation,
    };
  } else {
    return {
      ok: false,
      error: "잘못된 분류입니다.",
    };
  }

  const notice = await client.notice.create({
    data: sortationLink,
  });

  return {
    ok: true,
    notice,
  };
};

export default {
  Mutation: {
    createNotice: protectedResolver(createNoticeResolver),
  },
};
