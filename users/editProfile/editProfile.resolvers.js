import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";

import client from "../../client";
import { protectedResolvers } from "../users.utils";
import { upload } from "../../shared/shared.utils";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolvers(
      async (
        _,
        { firstName, lastName, username, email, password, bio, avatar },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await upload(avatar, loggedInUser?.id);
        }

        const hashedPassword = password && (await bcrypt.hash(password, 10));
        const user = await client.user.update({
          where: { id: loggedInUser?.id },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        if (user) return { ok: true };
        else return { ok: false, error: "Cound not update profile." };
      }
    ),
  },
};
