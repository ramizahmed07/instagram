import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) return { ok: false, error: "User not found." };
      const followers = await client.user
        .findUnique({
          where: { username },
        })
        .followers({
          skip: (page - 1) * 5,
          take: 5,
        });
      const followersCount = await client.user.count({
        where: {
          following: {
            some: { username },
          },
        },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(followersCount / 5),
      };
    },
  },
};
