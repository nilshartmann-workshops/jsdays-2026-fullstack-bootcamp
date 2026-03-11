import { Resolvers } from "../../generated/resolver-types";

// In der "Resolvers"-Map sind die benötigten Resolver-Funktionen untergebracht
// Auf oberster Ebene steht jeweils der GraphQL Typname (Query, Mutation, Author, Book, etc)
//  darunter dann jeweils ein Objekt mit den Resolver-Funktionen,
//    Feldname als Key, Funktion als Value:
//    const authorsResolvers: Resolvers = {
//         Query: {
//           authors(_, __, context) {
//             // Resolver für das Root-Feld Query.authors
//           },
//           authorById(_, args, context) {
//             // Resolver für das Root-Feld Query.authorById
//           },
//         },
//
//         Author: {
//           books(author, _, context) {
//              // Resolver für das Feld Author.books
//           },
//         }
//   }
//
// Die Signatur einer Resolver-Funktion sieht so aus:
//  function(parent, args, context)
//
//  -> parent Objekt das der jeweils höhere Resolver zurückgeliefert hat
//       (nicht vorhanden bei Query/Mutation-Resolvern)
//  -> args Objekt mit den übergebenen Objekten
//  -> context Globales Context-Objekt, das Request-spezifische Informationen
//     enthalten kann. In unserem Fall werden die DataSources zum Zugriff auf die
//     Datenbank darüber übergeben

export const authorsResolvers: Resolvers = {
  Query: {},

  Author: {},

  Mutation: {},
};
