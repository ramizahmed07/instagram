import client from "../../client";

export default {
  Query: {
    seePostComments: (_, { id }) =>
      client.post.findUnique({ where: { id } }).comments(),
  },
};
