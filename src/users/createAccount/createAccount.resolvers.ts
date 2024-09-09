import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const createAccountResolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      {
        username,
        email,
        password,
        interlock,
        uid,
        privacyAccess,
        usetermAccess,
      }: {
        username: string;
        email: string;
        password: string;
        interlock: string;
        uid: string;
        privacyAccess: boolean;
        usetermAccess: boolean;
      },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            email,
          },
        });
        if (existingUser) {
          throw new Error(
            "해당 이메일 또는 휴대전화번호는 이미 사용중 입니다."
          );
        }
        const uglyPassword = await bcrypt.hash(password, 10);

        const newUser = await client.user.create({
          data: {
            username,
            email,
            password: uglyPassword,
            kakaoConnect: interlock === "kakao" ? true : false,
            kakaoID: interlock === "kakao" ? uid : null,
            googleConnect: interlock === "google" ? true : false,
            googleID: interlock === "google" ? uid : null,
            appleConnect: interlock === "apple" ? true : false,
            appleID: interlock === "apple" ? uid : null,
            naverConnect: interlock === "naver" ? true : false,
            naverID: interlock === "naver" ? uid : null,
            privacyAccess,
            usetermAccess,
          },
        });

        const token = await jwt.sign(
          { id: newUser.id },
          process.env.SECRET_KEY as string
        );

        if (interlock !== "일반") {
          return {
            ok: true,
            token,
            interlock,
          };
        } else {
          return {
            ok: true,
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: "회원가입 중 오류가 발생하였습니다.",
        };
      }
    },
  },
};

export default createAccountResolvers;
