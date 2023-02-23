import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword }) => {
      const result = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      return result;
    },
  },
};
