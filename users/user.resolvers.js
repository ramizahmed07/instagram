import client from "../client";

export default {
  User: {
    totalFollowers: ({ id }) =>
      client.user.count({
        where: { following: { some: { id } } },
      }),
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: { id },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const exists = await client.user.findFirst({
        where: {
          username: loggedInUser?.username,
          following: {
            some: { id },
          },
        },
        select: {
          following: { select: { id: true } },
        },
      });
      return !!exists;
    },
    posts: ({ id }, { page }) =>
      client.user.findUnique({ where: { id } }).posts({
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};
