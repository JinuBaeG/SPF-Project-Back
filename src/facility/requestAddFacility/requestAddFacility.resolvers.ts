import { Resolver, Resolvers } from "../../types";

// requestAddFacilityResolvers 함수 정의
const requestAddFacilityResolvers: Resolver = async (
  _,
  { title, description },
  { loggedInUser, client }
) => {
  try {
    // 로그인 여부 체크
    if (!loggedInUser) {
      return {
        ok: false,
        error: "로그인이 필요합니다.",
      };
    }

    // 시설 요청 추가
    const facility = await client.requestAddFacility.create({
      data: {
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        title,
        description,
      },
    });

    if (facility) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: "시설 요청에 실패했습니다.",
      };
    }
  } catch (error) {
    console.error("시설 요청 실패:", error);
    return {
      ok: false,
      error: "시설 요청 중 오류가 발생했습니다.",
    };
  }
};

// 전체 리졸버
const resolvers: Resolvers = {
  Mutation: {
    requestAddFacility: requestAddFacilityResolvers,
  },
};

export default resolvers;
