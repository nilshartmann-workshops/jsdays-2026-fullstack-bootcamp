import { Component } from '@angular/core';
import { Book } from '../book.model';
import { getDemoBooks } from '../demo-data';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.html',
})
export class BookList {
  // getDemoBooks liefert eine Liste mit Büchern
  //  - im nächsten Schritt lesen wir die Liste vom Server
  readonly books: Book[] = getDemoBooks();

  // todo:
  //   - Im Template mit @for über die Bücher iterieren
  //     und jeweils eine BookCard rendern
  //   - Dabei 'track book.id' angeben
}
