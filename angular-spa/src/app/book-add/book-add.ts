import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, min, submit } from '@angular/forms/signals';
import { BookService } from '../book.service';

interface BookFormData {
  authorId: string;
  title: string;
  isbn: string;
  pages: number;
  year: number;
}

@Component({
  selector: 'app-book-add',
  imports: [FormField],
  templateUrl: './book-add.html',
})
export class BookAdd {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  readonly success = signal(false);
  readonly error = signal(false);

  readonly bookModel = signal<BookFormData>({
    authorId: 'a-1',
    title: '',
    isbn: '',
    pages: 0,
    year: 0,
  });

  readonly bookForm = form(this.bookModel, (schema) => {
    required(schema.title, { message: 'Titel ist erforderlich' });
    required(schema.isbn, { message: 'ISBN ist erforderlich' });
    required(schema.pages, { message: 'Seiten ist erforderlich' });
    min(schema.pages, 1, { message: 'Seiten muss eine positive Ganzzahl sein' });
    required(schema.year, { message: 'Jahr ist erforderlich' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.success.set(false);
    this.error.set(false);

    submit(this.bookForm, {
      action: async () => {
        const formValue = this.bookModel();

        return new Promise((resolve) => {
          this.bookService.create(formValue).subscribe({
            next: () => {
              this.router.navigate(['/']);
              resolve(undefined);
            },
            error: () => {
              this.error.set(true);
              resolve(undefined);
            },
          });
        });
      },
    });
  }
}
