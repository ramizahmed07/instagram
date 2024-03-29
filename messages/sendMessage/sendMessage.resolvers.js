import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import { pubsub } from "../../pubsub";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectedResolvers(
      async (_, { userId, roomId, text }, { loggedInUser }) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });
          if (!user) return { ok: false, error: "User not found." };
          room = await client.room.create({
            data: {
              users: {
                connect: [{ id: userId }, { id: loggedInUser?.id }],
              },
            },
          });
        }
        if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });
          if (!room) return { ok: false, error: "Room not found." };
        }
        await client.message.updateMany({
          where: { roomId: room?.id, userId: { not: loggedInUser?.id } },
          data: { read: true },
        });
        const message = await client.message.create({
          data: {
            text,
            room: {
              connect: {
                id: room?.id,
              },
            },
            user: {
              connect: { id: loggedInUser?.id },
            },
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
        return { ok: true };
      }
    ),
  },
};
