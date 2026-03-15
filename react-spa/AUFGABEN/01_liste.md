# Übung: Komponenten mit React bauen

# Starten

- Du kannst die React-Anwendung mit `npm run dev` starten
- Die Anwendung läuft dann auf http://localhost:5100
- Wenn du die Anwendung das erste Mal startest, sollte dort ein "todo: Bücherliste anzeigen!" stehen 

# Schritte

1. Die `BookCard`-Komponente zur Darstellung eines einzelnen Buchs vervollständigen
   - Datei: src/components/list/BookCard.tsx
   - Die Komponente soll ein einzenes Buch (`Book`-Type aus `src/types.ts`) als Property übergeben bekommen
   - In der Komponente kannst du dann die Eigenschaften von `book` ausgeben
           - Das muss nicht schön aussehen, Styling machen wir in diesem Workshop nicht
2. In `BookList` (`src/components/list/BookList.tsx`) liefert die Funktion `getDemoData` eine Liste von Büchern. Diese Bücher sollen mit `BookCard` angezeigt werden.
    - (Das "echte" Daten lesen vom Server machen wir im nächsten Schritt, hier erstmal nur statische Demo Daten ohne echten Sever-Zugriff)
    - Dazu mit `map` über das `books`-Array iterieren und jeweils eine BookCard ausgeben.
    - Dabei das `key`-Property und das `book`-Property angeben:
    - ```typescript jsx
     { data.map( b => <BookCard key={b.id} book={b} /> ) }
     ```

# Material

- JSX zur Beschreibung von UI: https://react.dev/learn/writing-markup-with-jsx
- Properties in React: https://react.dev/learn/passing-props-to-a-component
- Listen in React: https://react.dev/learn/rendering-lists
    - `key` property: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key


