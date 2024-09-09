import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// Resolver 함수 분리
const seeGPSTermResolver: Resolver = async (_, __, {}) => {
  return await client.config.findFirst({
    select: {
      gpsTerms: true,
    },
  });
};

// Resolvers 객체
const resolvers: Resolvers = {
  Query: {
    seeGPSTerm: seeGPSTermResolver,
  },
};

export default resolvers;
