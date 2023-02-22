import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, page }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) return { ok: false, error: "User not found." };

      const following = await client.user
        .findUnique({
          where: { username },
        })
        .following({
          skip: (page - 1) * 5,
          take: 5,
        });
      const followingCount = await client.user.count({
        where: {
          following: {
            some: { username },
          },
        },
      });
      return {
        ok: true,
        following,
        totalPages: Math.ceil(followingCount / 5),
      };
    },
  },
};
