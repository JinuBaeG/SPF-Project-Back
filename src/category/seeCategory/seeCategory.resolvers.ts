import client from "../../client";
import { Resolver, Resolvers } from "../../types";

const seeCategoryResolver: Resolver = async (_, { offset }, { client }) => {
  return await client.category.findMany({
    skip: offset,
    take: 5,
  });
};

const resolvers: Resolvers = {
  Query: {
    seeCategory: seeCategoryResolver,
  },
};

export default resolvers;
