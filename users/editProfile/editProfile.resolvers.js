import bcrypt from "bcrypt";

import client from "../../client";
import { protectedResolvers } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolvers(
      async (
        _,
        { firstName, lastName, username, email, password },
        { loggedInUser }
      ) => {
        const hashedPassword = password && (await bcrypt.hash(password, 10));
        const user = await client.user.update({
          where: { id: loggedInUser?.id },
          data: {
            firstName,
            lastName,
            username,
            email,
            ...(hashedPassword && { password: hashedPassword }),
          },
        });
        if (user) return { ok: true };
        else return { ok: false, error: "Cound not update profile." };
      }
    ),
  },
};
