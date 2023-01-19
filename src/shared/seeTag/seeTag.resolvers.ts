export default {
  Query: {
    seeTag: async (_, { offset }, { client }) => {
      return await client.tag.findMany({});
    },
  },
};
