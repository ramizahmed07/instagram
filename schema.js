const path = require("path");

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typesArray = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const resolversArray = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(typesArray);

const resolvers = mergeResolvers(resolversArray);
export const schema = makeExecutableSchema({ typeDefs, resolvers });
