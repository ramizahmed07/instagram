require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";
import path from "path";

import { getUser } from "./users/users.utils";
import { typeDefs, resolvers } from "./schema";

async function startServer() {
  const PORT = process.env.PORT;
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use("/static", express.static("uploads"));

  app.use(
    "/",
    bodyParser.json(),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        loggedInUser: await getUser(req.headers.authorization),
      }),
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
}

startServer();
