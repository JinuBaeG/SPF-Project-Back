import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const adminLoginResolvers: Resolvers = {
  Mutation: {
    adminLogin: async (_, { id, password }, { client }) => {
      try {
        // 사용자 ID로 관리자 계정 찾기
        const check = await client.adminUser.findFirst({
          where: { userId: id },
        });
        if (!check) {
          return {
            ok: false,
            error: "존재하지 않는 사용자입니다.",
          };
        }

        // 비밀번호 비교
        const checkPw = await bcrypt.compare(password, check.password);
        if (!checkPw) {
          return {
            ok: false,
            error: "올바르지 않은 비밀번호입니다.",
          };
        }

        // JWT 토큰 생성
        const token = jwt.sign({ id: check.id }, process.env.SECRET_KEY as string);

        return {
          ok: true,
          token,
        };
      } catch (e) {
        console.error(e);
        return {
          ok: false,
          error: "로그인 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default adminLoginResolvers;
