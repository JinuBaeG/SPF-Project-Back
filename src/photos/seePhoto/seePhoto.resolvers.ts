import { Resolver, Resolvers } from "../../types";

// 사진 조회 리졸버
const seePhotoResolver: Resolver = (_, { id }, { client }) => {
  return client.photo.findUnique({
    where: {
      id,
    },
  });
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Query: {
    seePhoto: seePhotoResolver,
  },
};

export default resolvers;
