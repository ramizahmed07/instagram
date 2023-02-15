import * as bcrypt from "bcrypt";

import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, password, username, email }
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

        return client.user.create({
          data: {
            firstName,
            lastName,
            password: hashedPassword,
            email,
            username,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};
