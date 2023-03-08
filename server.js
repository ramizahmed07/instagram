require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlUploadExpress } from "graphql-upload";
import bodyParser from "body-parser";
import { getUser } from "./users/users.utils";
import { typeDefs, resolvers } from "./schema";

async function startServer() {
  const PORT = process.env.PORT;
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const server = new ApolloServer({
    schema,
    uploads: false,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
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
