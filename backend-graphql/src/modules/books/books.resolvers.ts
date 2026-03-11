import { Resolvers } from "../../generated/resolver-types";

export const booksResolvers: Resolvers = {
  Query: {
    books(_, __, context) {
      return context.dataSources.books.getAll();
    },
    bookById(_, args, context) {
      return context.dataSources.books.getById(args.id);
    },
  },
  Book: {
    author(book, __, context) {
      return context.dataSources.authors.getById(book.authorId);
    },
  },
  Mutation: {
    createBook(_, args, context) {
      return context.dataSources.books.create(args.input);
    },
  },
};
