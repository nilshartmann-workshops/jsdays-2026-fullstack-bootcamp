# Übung: Implementiere die Logik für die GET /books Route

- Die Route soll alle Bücher aus der Datenbank zurückliefern

## Schritte

> 💡 Wir arbeiten im Verzeichnis `src/modules/books`
1. Ergänze in `controller.ts` eine Handler-Funktion, die aus der Datenbank alle Bücher liest und zurückgibt.
   - In deiner Handler-Funktion kanst du die Funktionen aus `model.ts` verwenden, um die Bücher aus der Datenbank zu laden
   - Du kannst die Liste, so wie sie aus der DB kommt, als Ergebnis des Endpunkts zurückliefern.
2. Registriere deine Handler-Funktion in `routes.ts` für den Endpunkt `GET /`
3. Dein Endpunkt funktioniert korrekt, wenn Du `http://localhost:3000/api/books` aufrufen kannst, und dort eine (JSON-)Liste mit den Büchern zurückkommt
4. **Optional, nur wenn Zeit ist**:
   - Implementiere den `DELETE` Endpunkt für ein einzelnes Buch (`DELETE /api/books/:id)
   - Die Logik zum Löschen des Buches aus der Datenbank findest du in `model.ts`
   - Deine Handler-Funktion für den Endpunkt hat einen variablen Platzhalter in der URL (`id`). Damit TypeScript den Platzhalter kennt, musst du den als Objekt für das `Request`-Objekt setzen: 
     - ```typescript jsx
        export function remove(req: Request<{ id: string }>, res: Response): void {
         // ...
       }        
       ```
   - Registriere die Handler-Funktion für die `DELETE` HTTP Methode in `routes.ts`
   - Du kannst deinen Endpunkt z.B. mit `curl` testen, mit `-X` kannst du die HTTP Methode setzen:
     - `curl -v http://localhost:3000/api/books/b-2 -X DELETE`

# Hilfe?

> 💡Du kannst dir jederzeit unseren Code mit der Lösung ansehen, den du auf dem Branch `bootcamp` im GitHub Repository findest:
> 👉 https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/bootcamp
>
> Und natürlich kannst du uns auch jederzeit ansprechen.

# Material

- Routing basics von Express.JS: https://expressjs.com/en/starter/basic-routing.html
- Route methods ("Handler-Funktionen"): https://expressjs.com/en/guide/routing.html
- `Router` API Docs: https://expressjs.com/en/5x/api.html#router
- 
