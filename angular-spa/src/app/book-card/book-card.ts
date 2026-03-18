import { Component, input, output } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html',
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly onDelete = output<string>();
}
