import client from "../../client";
import { cryptFunction } from "../users.utils";
import { Resolvers } from "../../types";

const checkPhoneResolvers: Resolvers = {
  Mutation: {
    checkPhone: async (_, { phoneNumber }: { phoneNumber: string }) => {
      try {
        const uglyPhoneNumber = cryptFunction(phoneNumber);

        const result = await client.user.findUnique({
          where: {
            phoneNumber: uglyPhoneNumber,
          },
        });

        if (result) {
          return {
            ok: false,
            error: "이미 가입된 휴대전화번호 입니다.",
          };
        } else {
          return {
            ok: true,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: "휴대전화번호 확인 중 오류가 발생하였습니다.",
        };
      }
    },
  },
};

export default checkPhoneResolvers;
