import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";

import client from "../../client";
import { protectedResolvers } from "../users.utils";

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
          const { filename, createReadStream } = await avatar;
          const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeSream = createWriteStream(
            process.cwd() + "/uploads/" + newFileName
          );
          readStream.pipe(writeSream);
          avatarUrl = `http://localhost:4000/static/${newFileName}`;
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
