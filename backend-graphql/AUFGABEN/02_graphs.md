# Übung: Baue einen kleinen Graph und erweiter den Author-Type um `books`

- Die GraphQL API soll alle Bücher zu einem Autoren zurückliefern


# Schritte

1. Erweitere das Schema
    - In `src/modules/authors/authors.schema.graphql` musst du den Author-Typen vervollständigen
    - Ergänze das Feld `books`, das eine Liste von `Book`-Objekten zurückliefern soll
    - Hinweis: wenn du die Datei änderst und speicherst, sollte der Codegenerator automatisch ausgeführt werden (s. Ausgaben auf der Konsole)
2. Implementiere die Resolver-Funktionen für das Feld `Author.books` in `src/modules/authors/authors.resolver.ts`
   - Das `parent`-Argument enthält den Wert, der vom übergeordneten Resolver aufgerufen wird (bei uns also ein  `Author`, den wir aus der DB gelesen haben)
   - Mit dem `context`-Objekt hast du Zugriff auf die `books` DataSource. Darin gibt es eine Methode, mit der du die Bücher für einen Autoren (anhand dessen `id`) auslesen kannst
   - Den Rückgabe-Wert davon kannst du aus deiner Resolver-Funktion zurückgeben
   - Die generierten TypeScript-Typen in `generated/resolver-types.ts` sollten sicherstellen, dass du alles korrekt machst :-)
3. Teste deine Implementierung mit folgendem GraphQL Query in der Sandbox:
   - ```graphql
      query GetAuthorAndBooks {
        authorById(id: "a-1") {
          id firstName lastName
          books {
            id title isbn
          }
       }
     }
     ```
# Hilfe?

> 💡Du kannst dir jederzeit unseren Code mit der Lösung ansehen, den du auf dem Branch `bootcamp` im GitHub Repository findest:
> 👉 https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/bootcamp
>
> Und natürlich kannst du uns auch jederzeit ansprechen.
