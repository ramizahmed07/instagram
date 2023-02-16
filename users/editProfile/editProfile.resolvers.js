import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);

      const hashedPassword = password && (await bcrypt.hash(password, 10));
      const user = await client.user.update({
        where: { id },
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
    },
  },
};
