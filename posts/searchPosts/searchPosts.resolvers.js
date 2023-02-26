import client from "../../client";

export default {
  Query: {
    searchPosts: (_, { keyword }) =>
      client.post.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
      }),
  },
};
