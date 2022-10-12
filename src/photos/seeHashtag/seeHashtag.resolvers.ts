export default {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) => {
      return client.hashtag.findUnique({
        where: {
          hashtag,
        },
      });
    },
  },
};
