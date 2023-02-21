import client from "../../client";
import { protectedResolvers } from "../users.utils";

export default {
  Mutation: {
    unfollow: protectedResolvers(async (_, { username }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) return { ok: false, error: "User doesn't exist." };
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            disconnect: {
              username,
            },
          },
        },
      });
      return { ok: true };
    }),
  },
};
