import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book, CreateBook } from './book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/books';

  getAll() {
    // todo: GET /api/books mit HttpClient.get<Book[]>()
  }

  create(book: CreateBook) {
    // todo: POST /api/books mit HttpClient.post<Book>()
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
