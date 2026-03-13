# Übung: Implementiere die Logik für die POST /api/books Route

- Mit der Route soll ein neues Buch in der Datenbank eingefügt werden

## Schritte

> 💡 Wir arbeiten im Verzeichnis `src/modules/books`
1. Ergänze in `controller.ts` eine Handler-Funktion, die (Buch-)Daten aus dem Request `body` nimmt und in der Datenbank speichert.  
   - In deiner Handler-Funktion kanst du die Funktionen aus `model.ts` verwenden, um das Buch in der Datenbank zu speichern
   - Sofern es keien Fehler gibt, soll die Funktion das gespeicherte Buch an den Client zurückliefern.
     - Der HTTP Status-Code soll `201 CREATED` sein
     - Du kannst das Objekt, so wie es aus der DB kommt, zurückliefern (es enthält dann auch die Id, die von der DB vergeben wird)
2. Registriere deine Handler-Funktion in `routes.ts` für den Endpunkt `POST /`
3. Du kannst den Endpunkt mit `curl` testen:
    ```bash
     curl -v http://localhost:3000/api/books -H "Content-Type: application/json" --data '{"authorId":"a1","title":"JS Basics","pages":200,"year":2026,"isbn":"4234-31231-3122"}'
    ```

# Hilfe?

> 💡Du kannst dir jederzeit unseren Code mit der Lösung ansehen, den du auf dem Branch `bootcamp` im GitHub Repository findest:
> 👉 https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/bootcamp
>
> Und natürlich kannst du uns auch jederzeit ansprechen.

