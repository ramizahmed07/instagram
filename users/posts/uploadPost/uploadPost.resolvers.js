import client from "../../../client";
import { protectedResolvers } from "../../users.utils";

export default {
  Mutation: {
    uploadPost: protectedResolvers(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = null;
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }
        const post = await client.post.create({
          data: {
            file: "empty",
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
