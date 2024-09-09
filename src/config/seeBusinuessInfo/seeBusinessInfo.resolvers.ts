import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// Resolver 함수 분리
const seeBusinessInfoResolver: Resolver = async (_, __, {}) => {
  return await client.config.findFirst({
    select: {
      businessInfo: true,
    },
  });
};

// Resolvers 객체
const resolvers: Resolvers = {
  Query: {
    seeBusinessInfo: seeBusinessInfoResolver,
  },
};

export default resolvers;
