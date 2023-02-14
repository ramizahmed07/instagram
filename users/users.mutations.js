import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import client from "../client";

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
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) return { ok: false, error: "User not found." };
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) return { ok: false, error: "Incorrect password." };
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
