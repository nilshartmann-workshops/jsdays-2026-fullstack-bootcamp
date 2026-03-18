# Übung: Komponenten mit Angular bauen

# Starten

- Du kannst die Angular-Anwendung mit `npm start` starten
- Die Anwendung läuft dann auf http://localhost:4200
- Wenn du die Anwendung das erste Mal startest, sollte dort ein "todo: Bücherliste anzeigen!" stehen

# Schritte

1. Die `BookCard`-Komponente zur Darstellung eines einzelnen Buchs vervollständigen
   - Datei: `src/app/book-card/book-card.ts`
   - Die Komponente soll ein Buch (`Book`-Type aus `src/app/book.model.ts`) als Input-Signal übergeben bekommen:
   ```typescript
   readonly book = input.required<Book>();
   ```
   - Im Template (`book-card.html`) die Eigenschaften von `book()` ausgeben (Titel, Jahr, ISBN, Seiten)
   - Die CSS-Klasse `Card` für den Rahmen verwenden
2. In `BookList` (`src/app/book-list/book-list.ts`) liefert die Funktion `getDemoBooks` eine Liste von Büchern. Diese Bücher sollen mit `BookCard` angezeigt werden.
    - (Das "echte" Daten lesen vom Server machen wir im nächsten Schritt, hier erstmal nur statische Demo-Daten ohne echten Server-Zugriff)
    - Dazu im Template mit `@for` über das `books`-Array iterieren und jeweils eine `BookCard` ausgeben:
    ```html
    @for (book of books; track book.id) {
      <app-book-card [book]="book" />
    }
    ```

# Material

- Angular Signals: https://angular.dev/guide/signals
  - `input()` / `input.required()`: https://angular.dev/guide/signals/inputs
- Neue Control-Flow-Syntax:
  - `@for`: https://angular.dev/guide/templates/control-flow#for-block
- Komponenten: https://angular.dev/guide/components
