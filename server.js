require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";

import { getUser } from "./users/users.utils";
import { typeDefs, resolvers } from "./schema";

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",
    cors(),
    bodyParser.json(),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        loggedInUser: await getUser(req.headers.authorization),
      }),
    })
  );
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startServer();
