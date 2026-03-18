# Übung: Data Fetching mit HttpClient

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

1. In `BookList` (`src/app/book-list/book-list.ts`) sollen die Daten vom Server geladen werden
2. Entferne dort den Aufruf von `getDemoBooks`
3. Injiziere stattdessen den `BookService` mit `inject()` und nutze die `getAll()`-Methode:
   - Im `BookService` (`src/app/book.service.ts`) die Methode `getAll()` implementieren:
   ```typescript
   getAll() {
     return this.http.get<Book[]>(this.baseUrl);
   }
   ```
4. In `BookList` die Bücher in `ngOnInit` laden und in ein Signal schreiben:
   ```typescript
   readonly books = signal<Book[]>([]);

   ngOnInit() {
     this.bookService.getAll().subscribe({
       next: (books) => this.books.set(books),
     });
   }
   ```
   - Im Template `books()` statt `books` verwenden (Signal-Aufruf)
5. **Optional** (nur wenn Zeit ist)
   - Lade- und Fehlerzustände mit Signals und `@if` abbilden:
   ```html
   @if (loading()) {
     <p class="LoadingMessage">Bitte warten, Bücher werden geladen...</p>
   } @else if (error()) {
     <p class="ErrorMessage">Fehler beim Laden der Bücher</p>
   } @else {
     @for (book of books(); track book.id) { ... }
   }
   ```

# Material

## HttpClient
- HttpClient Übersicht: https://angular.dev/guide/http
- GET-Requests: https://angular.dev/guide/http/making-requests#fetching-data-with-get

## Angular Signals
- Signals Übersicht: https://angular.dev/guide/signals
- `signal()`: https://angular.dev/guide/signals#writable-signals

## Dependency Injection
- `inject()` Funktion: https://angular.dev/api/core/inject

## Neue Control-Flow-Syntax
- `@if`: https://angular.dev/guide/templates/control-flow#if-block

# Beispiel: Daten laden mit HttpClient

```typescript
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Book } from './book.model';

const http = inject(HttpClient);
http.get<Book[]>('/api/books').subscribe({
  next: (books) => console.log(books),
});
```
