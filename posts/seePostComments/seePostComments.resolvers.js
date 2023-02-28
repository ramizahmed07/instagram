import client from "../../client";

export default {
  Query: {
    seePostComments: (_, { id }) =>
      client.comment.findMany({
        where: {
          postId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
  },
};
