import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const post = await client.post.findUnique({
        where: { id },
      });
      if (!post) return { ok: false, error: "Post not found." };
      const where = {
        userId_postId: {
          userId: loggedInUser?.id,
          postId: id,
        },
      };
      const like = await client.like.findUnique({
        where,
      });

      if (like) {
        await client.like.delete({
          where,
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
            post: {
              connect: {
                id,
              },
            },
          },
        });
      }
      return { ok: true };
    }),
  },
};
