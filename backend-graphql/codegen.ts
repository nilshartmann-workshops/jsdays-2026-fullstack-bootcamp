import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/**/*.schema.graphql",
  generates: {
    "src/generated/resolver-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        contextType: "../context#BookStoreGraphQLContext",
        mappers: {
          Book: "../modules/books/books.types#DbBook",
          Author: "../modules/authors/authors.types#DbAuthor",
          CreateBookInput: "../modules/books/books.types#DbCreateBook",
        },
      },
    },
  },
};

export default config;
