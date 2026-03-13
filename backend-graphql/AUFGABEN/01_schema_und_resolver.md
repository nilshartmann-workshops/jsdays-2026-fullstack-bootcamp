# Übung: Erstelle das Schema und die ersten Resolver für den `Author` Type

# Starten des Servers und des Code Generators

- Bitte starte mit `npm run dev` den Apollo GraphQL Server
- Dieses Kommando startet auch den Codegenerator
- Wenn du Änderungen an deinem Code machst und speicherst, sollte die Datei `generated/resolver-types.ts` automatisch aktualisiert werden.
- Außerdem wird bei Änderungen automatisch der Server neugestartet

## Sandbox zum Ausführen von GraphQL Queries

- Der Server liefert einen GraphQL Explorer, die Apollo Sandbox, aus
- Du kannst darauf über http://localhost:4000 zugreifen und dort GraphQL Queries ausführen.
- Wenn du Änderungen in einem Server gemacht hast, musst du die Seite ggf. neuladen, damit die Code Completion sich aktualisiert.
- **Zum ausprobieren, ob dein Setup funktioniert**, kannst du dort folgenden Query ausführen:
  - ```graphql
     query  {
       books {
         id title
       }
    }
    ```

# Schritte

1. Erweitere das Schema
    - In `src/modules/authors/authors.schema.graphql` musst du den Author-Typen vervollständigen
    - Außerdem soll der `Query`-Typ zwei Felder (`authors` und `authorById`) bekommen
    - Weitere Infos in der Datei
    - Hinweis: wenn du die Datei änderst und speicherst, sollte der Codegenerator automatisch ausgeführt werden (s. Ausgaben auf der Konsole)
2. Implementiere die Resolver-Funktionen für die `Query`-Felder
    - In `src/modules/authors/authors.resolver.ts` musst du die Resolver-Funktionen für `authors` und `authorById` implementieren
    - Über das Context-Objekt (dritter Parameter der Resolver-Funktionen) bekommst du Zugriff auf die DataSources
    - Es gibt eine DataSource für `Authors`, darin findest du Methoden, mit denen du auf die DB zugreifen kannst (`getAll` und `getById`)
      - Die Rückgabe-Werte der Methoden in der DataSource kannst du direkt als Rückgabe-Werte deiner Resolver-Funktionen verwenden.
3. Teste deine Implementierung mit folgendne GraphQL Queries in der Sandbox:
   - ```graphql
     query GetAllAuthors {
       authors {
         id firstName lastName
       }
     }
     ```
   - ```graphql
     # Hier sollte EIN Autor zurückkommen:
     query GetSingleAuthor {
       authorById(id: "a-1") {
         id firstName lastName
       }
     }
     ```
   - ```graphql
     # Hier sollte null zurückkommen:
     query GetSingleAuthor {
       authorById(id: "a-666") {
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

- GraphQL Schema: https://graphql.org/learn/schema/
- GraphQL Queries: https://graphql.org/learn/queries/
- Resolver-Funktionen in Apollo Server: https://www.apollographql.com/docs/apollo-server/data/resolvers
- GraphQL CodeGenerator: https://the-guild.dev/graphql/codegen