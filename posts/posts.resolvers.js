import client from "../client";

export default {
  Post: {
    user: ({ userId: id }) => client.user.findUnique({ where: { id } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          posts: {
            some: {
              id,
            },
          },
        },
      }),
  },
  Hashtag: {
    posts: ({ id }, { page }) =>
      client.hashtag.findUnique({ where: { id } }).posts({
        take: 5,
        skip: (page - 1) * 5,
      }),

    totalPosts: ({ id }) =>
      client.post.count({
        where: {
          hashtags: { some: { id } },
        },
      }),
  },
};
