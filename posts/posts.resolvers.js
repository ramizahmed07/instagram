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
    posts: ({ id }) => client.hashtag.findUnique({ where: { id } }).posts(),
    totalPosts: ({ id }) =>
      client.post.count({
        where: {
          hashtags: { some: { id } },
        },
      }),
  },
};
