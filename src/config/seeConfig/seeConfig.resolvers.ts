import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// Resolver 함수 분리
const seeConfigResolver: Resolver = async (_, __, { client }) => {
  const config = await client.config.findFirst({});

  if (config) {
    return config;
  } else {
    return await client.config.create({
      data: {
        privacyTerms: "",
        gpsTerms: "",
        useTerms: "",
        businessInfo: "",
      },
    });
  }
};

// Resolvers 객체
const resolvers: Resolvers = {
  Query: {
    seeConfig: seeConfigResolver,
  },
};

export default resolvers;
