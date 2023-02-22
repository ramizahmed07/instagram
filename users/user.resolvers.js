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
  },
};
