# Übung: Ein Formular mit Angular Signal Forms

# Schritte

1. In der `BookAdd`-Komponente (`src/app/book-add/book-add.ts`) ein Formular mit der Signal Forms API erstellen:
   - Importiere `form`, `FormField`, `required`, `min`, `submit` aus `@angular/forms/signals`
   - Erstelle ein `bookModel`-Signal mit den Standardwerten:
   ```typescript
   readonly bookModel = signal<BookFormData>({
     authorId: 'a-1',
     title: '',
     isbn: '',
     pages: 0,
     year: 0,
   });
   ```
   - Erstelle das Formular mit Validierung:
   ```typescript
   readonly bookForm = form(this.bookModel, (schema) => {
     required(schema.title, { message: 'Titel ist erforderlich' });
     required(schema.isbn, { message: 'ISBN ist erforderlich' });
     required(schema.pages, { message: 'Seiten ist erforderlich' });
     min(schema.pages, 1, { message: 'Seiten muss eine positive Ganzzahl sein' });
     required(schema.year, { message: 'Jahr ist erforderlich' });
   });
   ```
2. Im Template das Formular binden:
   - `FormField` in den `imports` der Komponente hinzufügen
   - Eingabefelder mit `[formField]` verbinden:
   ```html
   <input id="title" type="text" [formField]="bookForm.title" />
   ```
   - Validierungsfehler anzeigen:
   ```html
   @if (bookForm.title().touched() && bookForm.title().invalid()) {
     @for (error of bookForm.title().errors(); track error) {
       <p class="InputError">{{ error.message }}</p>
     }
   }
   ```
3. Die `onSubmit()`-Methode implementieren:
   - `submit()` aus `@angular/forms/signals` verwenden
   - In der `action` den `BookService.create()` aufrufen:
   ```typescript
   onSubmit(event: Event) {
     event.preventDefault();
     submit(this.bookForm, {
       action: async () => {
         const formValue = this.bookModel();
         // BookService.create() aufrufen
       },
     });
   }
   ```
4. **Optional** (nur wenn Zeit ist)
   - Erfolgs- und Fehlermeldungen im Template anzeigen:
   ```html
   @if (success()) {
     <div class="FormSuccess">Buch erfolgreich gespeichert!</div>
   }
   @if (error()) {
     <div class="FormError">Fehler beim Speichern. Bitte versuche es erneut.</div>
   }
   ```

# Material

## Angular Signal Forms
- `form()`: Erstellt ein Formular aus einem Signal-Model
- `FormField`: Directive zum Verbinden von Inputs mit Formular-Feldern
- `required`, `min`: Validierungsfunktionen
- `submit`: Führt die Formular-Aktion aus (nur wenn Validierung erfolgreich)

## Signals
- `signal()`: https://angular.dev/guide/signals#writable-signals

## HttpClient
- POST-Requests: https://angular.dev/guide/http/making-requests#sending-data-to-a-server
