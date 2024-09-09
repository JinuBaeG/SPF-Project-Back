import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// Resolver 함수 분리
const seePrivacyResolver: Resolver = async (_, __, {}) => {
  return await client.config.findFirst({
    select: {
      privacyTerms: true,
    },
  });
};

// Resolvers 객체
const resolvers: Resolvers = {
  Query: {
    seePrivacy: seePrivacyResolver,
  },
};

export default resolvers;
