import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 사진 검색 리졸버
const searchPhotosResolver: Resolver = async (_, { keyword }, { client }) => {
  return client.photo.findMany({
    where: {
      caption: {
        startsWith: keyword,  // 키워드로 시작하는 캡션을 검색
      },
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    searchPhotos: searchPhotosResolver,
  },
};

export default resolvers;
