import { Resolver, Resolvers } from "../../types";

// Resolver 함수 분리
const editConfigResolver: Resolver = async (
  _,
  { id, privacyTerms, gpsTerms, useTerms, businessInfo },
  { client }
) => {
  try {
    await client.config.update({
      data: {
        privacyTerms,
        gpsTerms,
        useTerms,
        businessInfo,
      },
      where: {
        id,
      },
    });

    return {
      ok: true,
    };
  } catch (e) {
    return { ok: false, error: e };
  }
};

// Resolvers 객체
const resolvers: Resolvers = {
  Mutation: {
    editConfig: editConfigResolver,
  },
};

export default resolvers;
