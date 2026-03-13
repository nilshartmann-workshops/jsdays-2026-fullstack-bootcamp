# Übung: Stelle sicher, dass nur authorisierte User den `POST /books`-Endpunkt verwenden dürfen  


## Schritte

> 💡 Wir arbeiten im Verzeichnis `src/modules/books`
1. Extrahiere einen gültigen Token aus dem Request in der Funktion `validateSignature` (`src/middleware/auth.ts`) und setze dessen Payload (`user`)  an das `Request` Objekt
    - Die Funktion zum Auslesen, Validieren und Parsen des Tokens ist bereits fertig: `extractPayloadFromToken`
    - Wenn diese Funktion _kein_ gültiges Token findet, sollte die `validateSignature`-Funktion abbrechen und Status Code `401 UNAUTHORIZED` zurückliefern
    - Wenn das Token gültig ist, und du ein Objekt zurückbekommst, musst du das Objekt im Request unter dem Eintrag `user` ablegen, damit andere Handler-Funktionen darauf Zugriff haben:
      - ```typescript jsx
        const keycloakPayload = await extractPayloadFromToken(req);
        // wenn ungültig => 401 zurückliefern
        // wenn gültig, Payload aus dem Token an den Request hängen:
        req.user = {
          email: payload.email,
          username: payload.preferred_username,
          roles: payload.realm_access?.roles ?? [],
        };
        ```
2. Füge die `validateSignature`-Middleware für alle Routen der Anwendung hinzu
   - In `src/app.ts` zwischen den `cors`, `json` middlewares und den Anwendungsrouten einfügen:
     - ```typescript jsx
       import {validateSignature} from "./middleware/auth";
       
       // cors und json middleware...
       app.use('/api', validateSignature());
       // ...Anwendungsrouten...
       ```
3. Wenn du jetzt einen Endpunkt aufrufst, sollte HTTP Status 401 zurückkommen:
    - `curl -v http://localhost:3000/api/books` 
4. Um einen gültigen Token für den Request zu erhalten, musst du einen Token von unserem Keycloak Server abfragen.
    - Das funktioniert am besten mit dem `get-token.js`-Node-Modul:
      - `node get-token.js admin pw_admin`
    - Hintergrund: Dieses Skript macht einen Login-Request in Keykloak, um das Token für den angegebenen User (`admin`) und dessen Passwort `pw_admin` zu beziehen.
    - Das Token wird auf der Konsole ausgegeben.
    - Du kannst das Token in die Zwischenablage kopieren und auf https://jwt.io einfügen um es einzusehen
    - Mit dem Token kannst du jetzt einen Request machen:
      - `curl -v  http://localhost:3000/api/books -H "Authorization: Bearer TOKEN_HIER_EINFUEGEN`
    - Achtung! Das Token ist nur ein paar Minuten gültig. Ggf. musst du zwischendurch ein Neues abfragen.
5. Du kannst in `src/app.ts` die `/api/me`-Route einbinden, die das User-Objekt aus dem Request zurückliefert.
   - ```typescript
     // src/app.ts
     import { meRoute, validateSignature } from "./middleware/auth";
     
     // nach allen anderen Routen:
     app.get("/api/me", meRoute);
     ```
   - Diese Route kannst du ebenfalls mit curl und einem gültigen Token aufrufen. Der Inhalt des Tokens wird dann als Response an den Client zurückgeliefert.

# Hilfe?

> 💡Du kannst dir jederzeit unseren Code mit der Lösung ansehen, den du auf dem Branch `bootcamp` im GitHub Repository findest:
> 👉 https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/bootcamp
>
> Und natürlich kannst du uns auch jederzeit ansprechen.

# Material

