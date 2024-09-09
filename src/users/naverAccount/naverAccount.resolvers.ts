import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { cryptFunction } from "../users.utils";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    naverAccount: async (
      _,
      {
        username,
        email,
        password,
        phoneNumber,
        interlock,
        uid,
        privacyAccess,
        usetermAccess,
      },
      { client }
    ) => {
      try {
        const uglyPhoneNumber = cryptFunction(phoneNumber);
        const existingUser = await client.user.findUnique({
          where: {
            phoneNumber: uglyPhoneNumber,
          },
        });

        if (existingUser) {
          if (existingUser.naverConnect) {
            const token = jwt.sign(
              { id: existingUser.id },
              process.env.SECRET_KEY as string
            );
            return {
              ok: true,
              token,
            };
          } else {
            const updateUser = await client.user.update({
              where: {
                phoneNumber: uglyPhoneNumber,
              },
              data: {
                naverConnect: true,
                naverID: uid,
              },
            });

            const token = jwt.sign(
              { id: updateUser.id },
              process.env.SECRET_KEY as string
            );
            return {
              ok: true,
              token,
            };
          }
        }

        const uglyPassword = await bcrypt.hash(password, 10);

        const newUser = await client.user.create({
          data: {
            username,
            email,
            phoneNumber: uglyPhoneNumber,
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

        const token = jwt.sign(
          { id: newUser.id },
          process.env.SECRET_KEY as string
        );

        return {
          ok: true,
          token,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "회원가입 중 오류가 발생하였습니다.",
        };
      }
    },
  },
};

export default resolvers;
