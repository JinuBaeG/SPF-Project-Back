import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const loginResolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { client }) => {
      try {
        // 사용자 이메일로 사용자 검색
        const user = await client.user.findFirst({
          where: { email },
        });

        // 사용자가 존재하지 않으면 에러 반환
        if (!user) {
          return {
            ok: false,
            error: "존재하지 않는 사용자 입니다.",
          };
        }

        // 입력된 비밀번호와 저장된 비밀번호 비교
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return {
            ok: false,
            error: "올바르지 않은 비밀번호 입니다.",
          };
        }

        // JWT 토큰 생성
        const token = jwt.sign(
          { id: user.id },
          process.env.SECRET_KEY as string
        );

        return {
          ok: true,
          token,
        };
      } catch (error) {
        console.error(error);
        return {
          ok: false,
          error: "로그인 처리 중 오류가 발생했습니다.",
        };
      }
    },
  },
};

export default loginResolvers;
