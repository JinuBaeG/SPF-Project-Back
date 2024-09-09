import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// Resolver 함수 분리
const seeUseTermResolver: Resolver = async (_, __, {}) => {
  return await client.config.findFirst({
    select: {
      useTerms: true,
    },
  });
};

// Resolvers 객체
const resolvers: Resolvers = {
  Query: {
    seeUseTerm: seeUseTermResolver,
  },
};

export default resolvers;
