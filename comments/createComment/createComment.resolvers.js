import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolvers(
      async (_, { text, id }, { loggedInUser }) => {
        const post = await client.post.findFirst({
          where: {
            id,
          },
          select: { id: true },
        });
        if (!post) return { ok: false, error: "Post not found." };
        await client.comment.create({
          data: {
            text,
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
        return { ok: true };
      }
    ),
  },
};
