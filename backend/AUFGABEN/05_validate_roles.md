# Übung: Stelle sicher, dass nur Admins ein Buch anlegen können 


## Schritte

> 💡 Wir arbeiten im Verzeichnis `src/modules/books`
1. Vervollständige die Funktion `requireRole` in `src/middleware/auth.ts`
   - Diese Funktion soll das `user`-Objekt aus dem Request lesen und prüfen, ob der `user` darin die erforderliche Rolle `role_admin`enthält
   - Siehe Anmerkungen direkt in der Funktion
2. Füge die Funktion als weitere Middleware in die Routen-Konfiguration für (`POST /`) in `src/modules/books/routes.ts` ein:
   - ```typescript jsx
     import { requireRole } from "../../middleware/auth";
     
     // sicherstellen, dass nur User mit Rolle 'role_admin'
     // auf die POST Route zugreifen dürfen:
     
     router.post("/",
        requireRole("role_admin"), // <-- neu!
        validate(CreateBookSchema),
        controller.create
     );
      ```
3. Prüfe, dass die Logik funktioniert. Erzeuge dir mit `get-token.js` einen Token für den Admin User und rufe den `POST /api/books` Endpunkt auf:
   `curl -v http://localhost:3000/api/books -H "Authorization Bearer: DEIN_TOKEN" -H "Content-Type: application/json" --data '{"authorId":"a1","title":"JS Basics","pages":200,"year":2026,"isbn":"4234-31231-3122"}'`
   - Ein Admin-Token bekommst du mit:
      - `node get-token.js admin pw_admin`
   - Ein User-Token (mit dem der POST-Request nicht erlaubt sein sollte), bekommst du mit:
      - `node get-token.js susi pw_susi`

# Hilfe?

> 💡Du kannst dir jederzeit unseren Code mit der Lösung ansehen, den du auf dem Branch `bootcamp` im GitHub Repository findest:
> 👉 https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/bootcamp
>
> Und natürlich kannst du uns auch jederzeit ansprechen.

# Material

