import client from "../../client";

export default {
  Query: {
    seePostLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          postId: id,
        },
        select: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return likes.map((like) => like.user);
    },
  },
};
