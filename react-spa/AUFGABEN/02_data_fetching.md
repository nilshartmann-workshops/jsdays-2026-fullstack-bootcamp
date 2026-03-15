# Übung: Data Fetching mit TanStack Query

# API Server

- Bitte stell' sicher, dass dein REST Backend auf http://localhost:3000 läuft
- Damit die Anwendung funktioniert, müssen im Backend zwei Routen korrekt implementiert sein:
  - `GET /api/books`
  - `POST /api/books`
- Wenn die beiden Routen bei dir nicht funktionieren, verwende sicherheitshalber den Stand aus unserem Repository
- Bitte stelle sicher, dass die **Authentifizierung** im Backend **ausgeschaltet** ist.
  - Entferne ggf in (backend) `src/app.ts` die `validateSignature` Middleware
  - Entferne ggf. in (backend) `src/modules/books/routes.ts` in der `POST`-Route die `requireRole` middleware

# Schritte

1. In `BookList` (`src/components/list/BookList.tsx`) sollen die Daten vom Server geladen werden
2. Entferne dort den Aufruf von `getDemoBooks`
3. Lies stattdessen die Daten mit `useSuspenseQuery` aus TanStack Query vom Backend (http://localhost:3000/api/books)
   - Als `queryKey` kannst du einfach ein Array mit einem String (z.B. `books`) angeben (`["books"]`).
   - In der `queryFn` musst du die Buch-Liste laden und zurückgegeben
   - Wichtig: der Rückgabe-Typ der Funktion muss eine Liste von `Book`-Objekten sein, sonst gibt es bei der Verwendung TypeScript-Fehler
   - Um den korrekten Rückgabe-Typ (und -Wert) sicherzustellen, kannst du die gelesene Liste mit dem zod-Schema `BookListSchema` (`src/types.ts`) validieren lassen
   - Ein Beispiel findest du unten
4. **Optional** (nur wenn Zeit ist)
   - In `Index` (`src/routes/index.tsx`):
      - Füge eine `Suspense`-Komponente hinzu, die eine Wartemeldung ausgibt (`fallback`-Property)
      - Füge eine `ErrorBoundary`-Komponente hinzu, die eine Fehlermeldung ausgibt (`fallback`-Property)

# Material

## Daten lesen mit TanStack Query und Suspense
- TanStack Query Bibliothek: https://tanstack.com/query/latest/docs/framework/react/overview
- Queries with TanStack Query: https://tanstack.com/query/latest/docs/framework/react/guides/queries
   - Query Function `queryFn`: https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
   - Query Key `queryKey`: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
- Suspense mit TanStack Query: https://tanstack.com/query/latest/docs/framework/react/guides/suspense
   - `useSuspenseQuery`: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery
- React Suspense Komponente: https://react.dev/reference/react/Suspense
- React: Fehler abfangen mit Error Boundaries: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
   - (Hinweis: Du musst keine eigene Error-Boundary-Klasse implementieren, wir nutzen `ErrorBoundary` aus der Bibliothek react-error-boundary.)
- React Error Boundary Bibliothek: https://github.com/bvaughn/react-error-boundary
   - Das `fallback`-Property: https://github.com/bvaughn/react-error-boundary?tab=readme-ov-file#errorboundary-with-fallback-prop


# Beispiel: Daten laden mit fetch

Um die Bücherliste vom Backend zu lesen, kannst du folgenden Code verwenden.
 - In deiner React-Komponent musst du dazu `useSuspenseQuery` verwenden, und den Code in der `async queryFn`-Methode angeben,
   die du an `useSuspenseQuery` übergibst.

```typescript
import { BookListSchema } from "../types.ts";

// Request ausführen
const response = await fetch("http://localhost:3000/api/books");

// Payload auslesen
const json = await response.json();

// Payload mit zod validieren
return BookListSchema.parse(json).parse(json);

```

