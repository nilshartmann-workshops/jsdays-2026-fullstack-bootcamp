import { Component, inject, OnInit, signal } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
})
export class BookList implements OnInit {
  private readonly bookService = inject(BookService);

  readonly books = signal<Book[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  ngOnInit() {
    this.bookService.getAll().subscribe({
      next: (books) => {
        this.books.set(books);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  deleteBook(id: string) {
    this.bookService.delete(id).subscribe({
      next: () => {
        this.books.update((books) => books.filter((b) => b.id !== id));
      },
    });
  }
}
