# Übung: Validiere den Body beim POST Request  


## Schritte

> 💡 Wir arbeiten im Verzeichnis `src/modules/books`
1. Beschreibe ein zod-Schema in `books/validation-schema.ts`, das dem bisherigen TypeScript Type `Book` entspricht.
    - Die Felder sind entweder `z.string()` oder `z.int()`
    - Du kannst weitere Regeln definieren, z.B. dass die Anzahl der Seiten eine positive Zahl sein muss, oder das Titel bzw. ISBN-Nummer kein Leerstring sein dürfen.
    - Lass dir von zod mit `z.infer` den TypeScript-Typen für `Book` erzeugen:
    - ```typescript jsx
      export type Book = z.infer<typeof BookSchema>;
      ```
2. Für den Body im `POST`-Request brauchen wir außerdem einen zod-Typen, der dem `Book`-Schema entspricht, aber ohne das `id`-Feld (denn das wird ja beim POST nicht angegeben).
    - Diesen Typen kannst du mit zod - ähnlich wie in TypeScript - mit `omit` erzeugen:
      - ```typescript jsx
        export const CreateBookSchema = BookSchema.omit({ id: true });
        export type CreateBook = z.infer<typeof CreateBookSchema>; 
        ```
3. Vervollständige die `validate`-Middleware in `src/middleware/validate.ts`
    - Du musst dort den Request Body (`req.body`) mit dem übergebenen Schema validieren
      - Das kannst du mit `safeParse` machen
      - Je nachdem, ob das Ergebnis gültig ist (`success`), kannst du die nächste Middleware mit `next()` aufrufen, oder einen Fehler an den Client senden (z.B. HTTP Status Code `400 BAD REQUEST`)
    - siehe auch die Anmerkungen in der Datei
3. Du kannst den POST Endpunkt dann mit `curl` testen und z.B. einen ungültigen Payload übergeben (hier fehlt das `year`):
    ```bash
     curl -v http://localhost:3000/api/books -H "Content-Type: application/json" --data '{"authorId":"a1","title":"JS Basics","pages":200,"isbn":"4234-31231-3122"}'
    ```

# Hilfe?

> 💡Du kannst dir jederzeit unseren Code mit der Lösung ansehen, den du auf dem Branch `bootcamp` im GitHub Repository findest:
> 👉 https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/bootcamp
>
> Und natürlich kannst du uns auch jederzeit ansprechen.

# Material

- Middleware im Router: https://expressjs.com/en/guide/using-middleware.html#middleware.router
- **zod**: https://zod.dev/
  - basic usage: https://zod.dev/basics
  - define schemas: https://zod.dev/api
  - infering typescript types: https://zod.dev/basics?id=inferring-types
  - `safeParse` und `parse` function: https://zod.dev/basics?id=parsing-data

