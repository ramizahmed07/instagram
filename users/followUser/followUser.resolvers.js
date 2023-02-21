import client from "../../client";
import { protectedResolvers } from "../users.utils";

export default {
  Mutation: {
    follow: protectedResolvers(async (_, { username }, { loggedInUser }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) return { ok: false, error: "User doesn't exist." };
      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            connect: { username },
          },
        },
      });
      return { ok: true };
    }),
  },
};
