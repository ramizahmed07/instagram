require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { schema } from "./schema";
import { getUser, protectResolvers } from "./users/users.utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
  schema,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.authorization),
    }),
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
