import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book, CreateBook } from './book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/books';

  getAll() {
    return this.http.get<Book[]>(this.baseUrl);
  }

  create(book: CreateBook) {
    return this.http.post<Book>(this.baseUrl, book);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
