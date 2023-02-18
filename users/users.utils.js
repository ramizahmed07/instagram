import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) return null;
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (!user) return null;

    return user;
  } catch (_) {
    return null;
  }
};

export const protectedResolvers = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) return { ok: false, error: "You need to login." };
  return resolver(root, args, context, info);
};
