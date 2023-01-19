export default {
  Query: {
    seeFeedCategoryList: async (_, __, { client }) => {
      return await client.feedCategoryList.findMany();
    },
  },
};
