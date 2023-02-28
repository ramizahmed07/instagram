import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolvers(
      async (_, { text, id }, { loggedInUser }) => {
        const comment = await client.comment.findFirst({
          where: {
            id,
          },
          select: { userId: true },
        });
        if (!comment) return { ok: false, error: "Comment not found." };
        if (comment?.userId !== loggedInUser?.id)
          return { ok: false, error: "Not authorized." };
        await client.comment.update({
          where: { id },
          data: { text },
        });
        return { ok: true };
      }
    ),
  },
};
