export default {
  Query: {
    seePhotoComments: async (_, { id }, { client }) => {
      return await client.photo
        .findMany({
          where: {
            photoId: id,
          },
          orderBy: {
            createAt: "desc",
          },
        })
        .Comment();
    },
  },
};
