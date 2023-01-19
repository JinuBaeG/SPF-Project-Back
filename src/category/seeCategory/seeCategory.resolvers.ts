import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { offset }, { client }) => {
      return client.category.findMany({});
    },
  },
};
