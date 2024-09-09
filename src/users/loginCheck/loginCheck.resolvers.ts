import * as jwt from "jsonwebtoken";
import { Resolver } from "../../types";

interface LoginCheckArgs {
  uid: string;
  token: string;
  email: string;
  interlock: "kakao" | "apple" | "google" | "naver";
}

const loginCheckResolvers: Resolver = async (
  _,
  { uid, token, email, interlock }: LoginCheckArgs,
  { client }
) => {
  try {
    let where: { kakaoID?: string; appleID?: string; googleID?: string; naverID?: string } = {};

    // 소셜 로그인 제공자에 따른 조건 설정
    switch (interlock) {
      case "kakao":
        where = { kakaoID: uid };
        break;
      case "apple":
        where = { appleID: uid };
        break;
      case "google":
        where = { googleID: uid };
        break;
      case "naver":
        where = { naverID: uid };
        break;
      default:
        return {
          ok: false,
          error: "잘못된 로그인 제공자입니다.",
        };
    }

    // `findFirst`를 사용하여 고유 필드가 아닌 다른 필드로도 검색 가능
    const result = await client.user.findFirst({
      where,  // 여러 필드를 사용할 수 있는 where 조건
    });

    // 사용자가 존재할 경우 새로운 토큰 생성
    if (result) {
      const newToken = jwt.sign({ id: result.id }, process.env.SECRET_KEY as string);

      return {
        ok: true,
        uid,
        email,
        token: newToken,
        interlock,
      };
    } else {
      // 사용자가 존재하지 않을 경우
      return {
        ok: false,
        uid,
        email,
        token,
        interlock,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      error: "로그인 처리 중 오류가 발생했습니다.",
    };
  }
};

export default {
  Mutation: {
    loginCheck: loginCheckResolvers,
  },
};
