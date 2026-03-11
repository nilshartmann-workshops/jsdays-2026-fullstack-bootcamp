import { ApolloServer } from "@apollo/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mergeResolvers } from "@graphql-tools/merge";

import { BookStoreGraphQLContext } from "./context";

import { authorsResolvers } from "./modules/authors/authors.resolvers";
import { booksResolvers } from "./modules/books/books.resolvers";

function readSchema(relativePath: string): string {
  return readFileSync(join(__dirname, relativePath), "utf-8");
}

const rootTypeDefs = `#graphql
type Query
type Mutation
`;

const authorsTypeDefs = readSchema("./modules/authors/authors.schema.graphql");
const booksTypeDefs = readSchema("./modules/books/books.schema.graphql");

const typeDefs = [rootTypeDefs, authorsTypeDefs, booksTypeDefs];

const resolvers = mergeResolvers([authorsResolvers, booksResolvers]);

export function createBookStoreApolloServer() {
  return new ApolloServer<BookStoreGraphQLContext>({
    typeDefs,
    resolvers,
  });
}
