import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const post = await client.post.findUnique({
        where: { id },
      });
      if (!post) return { ok: false, error: "Post not found." };
      const like = await client.like.findUnique({
        where: {
          userId_postId: {
            userId: loggedInUser?.id,
            postId: id,
          },
        },
      });

      if (like) {
        await client.like.delete({
          where: {
            userId_postId: {
              postId: id,
              userId: loggedInUser?.id,
            },
          },
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
