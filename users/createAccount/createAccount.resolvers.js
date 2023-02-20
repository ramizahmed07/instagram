import * as bcrypt from "bcrypt";

import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, password, username, email, bio }
    ) => {
      try {
        const user = await client.user.findFirst({
          where: {
            OR: [{ email }, { username }],
          },
        });
        if (user) {
          throw new Error("This user already exists.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            firstName,
            lastName,
            password: hashedPassword,
            email,
            username,
            bio,
          },
        });
        return { ok: true };
      } catch (error) {
        return { ok: false, error: "Can't create account." };
      }
    },
  },
};
