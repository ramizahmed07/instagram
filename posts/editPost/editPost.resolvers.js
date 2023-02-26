import client from "../../client";
import { protectedResolvers } from "../../users/users.utils";
import { processHashtags } from "../posts.utils";

export default {
  Mutation: {
    editPost: protectedResolvers(
      async (_, { id, caption }, { loggedInUser }) => {
        const oldPost = await client.post.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: { select: { hashtag: true } },
          },
        });
        if (!oldPost) return { ok: false, error: "Post not found!" };

        const post = await client.post.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPost?.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};
