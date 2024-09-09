import { Resolver, Resolvers } from "../../types";

const editAdminFaqResolvers : Resolver = async (
  _,
  { id, title, description },
  { client }
) => {
  const result = await client.adminFaq.update({
    data: {
      title,
      description,
    },
    where: {
      id,
    },
  });

  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    editAdminFaq: editAdminFaqResolvers,
  },
};

export default resolvers;
