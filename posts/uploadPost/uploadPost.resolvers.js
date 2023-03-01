import client from "../../client";
import { upload } from "../../shared/shared.utils";
import { protectedResolvers } from "../../users/users.utils";
import { processHashtags } from "../posts.utils";

export default {
  Mutation: {
    uploadPost: protectedResolvers(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = null;
        if (caption) {
          hashtagObj = processHashtags(caption);
        }

        const url = await upload(file, loggedInUser?.id, "uploads");

        const post = await client.post.create({
          data: {
            file: url,
            caption,
            user: {
              connect: { id: loggedInUser.id },
            },
            ...(hashtagObj.length && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        return post;
      }
    ),
  },
};
