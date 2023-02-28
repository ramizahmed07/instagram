import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    deletePost: protectedResolvers(async (_, { id }, { loggedInUser }) => {
      const post = await client.post.findFirst({
        where: { id },
        select: { userId: true },
      });
      if (!post) return { ok: false, error: "Post not found." };
      if (post?.userId !== loggedInUser?.id)
        return { ok: false, error: "Not authorized." };
      await client.post.delete({
        where: {
          id,
        },
      });
      return { ok: true };
    }),
  },
};
