import { Component } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { Book } from '../book.model';
import { getDemoBooks } from '../demo-data';

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
})
export class BookList {
  readonly books: Book[] = getDemoBooks();
}
