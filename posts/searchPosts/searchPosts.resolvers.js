import client from "../../client";

export default {
  Query: {
    searchPosts: (_, { keyword, page }) =>
      client.post.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
        skip: (page - 1) * 5,
        take: 5,
      }),
  },
};
