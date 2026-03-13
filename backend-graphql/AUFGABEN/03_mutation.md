# Übung: Baue eine Mutation zum Anelgen eines Buchs

# Schritte

1. Erweitere das Schema
    - In `src/modules/authors/authors.schema.graphql` musst du einen `input` Type `AuthorInput` mit den Informationen für einen neuen Autoren hinzufügen.
      - Feldnamen wie bei `Author` (ohne `id`)
    - Ergänze außerdem den `Mutation` type (`extend type Mutation { ... }`):
      - es soll dort ein Feld `createAuthor` geben
        - Das Feld hat ein Argument `input`, vom Typ `AuthorInput`
        - Das Feld liefert den angelegten `Author` zurück (oder null, falls es nicht geklappt hat)
   - Hinweis: wenn du die Datei änderst und speicherst, sollte der Codegenerator automatisch ausgeführt werden (s. Ausgaben auf der Konsole)
2. Implementiere den `Mutation`-Resolver für das Feld `Mutation.createAuthor` in `src/modules/authors/authors.resolver.ts`       
   - Das `args`-Argument des Resolvers enthält die übergebenen Argumente aus dem Query (hier also `input`)
   - Die Werte aus dem `input`-Feld kannst du direkt an die entsprechende Methode in der `authors` DataSource weitergeben
   - Die DataSource-Methode liefert den gespeicherten `Author` zurück, den du als Rückgabewert deines Resolvers verwenden kannst.
   - Die generierten TypeScript-Typen in `generated/resolver-types.ts` sollten sicherstellen, dass du alles korrekt machst :-)
3. Teste deine Implementierung mit folgendem GraphQL Query in der Sandbox:
   - ```graphql
      mutation CreateAuthor {
       createAuthor(input: {firstName: "Susi", lastName: "Müller"}) {
        id firstName lastName
       }
     }
     ```
# Hilfe?

> 💡Du kannst dir jederzeit unseren Code mit der Lösung ansehen, den du auf dem Branch `bootcamp` im GitHub Repository findest:
> 👉 https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/bootcamp
>
> Und natürlich kannst du uns auch jederzeit ansprechen.

# Material

- Mutations in GraphQL: https://graphql.org/learn/mutations/