import { Routes } from '@angular/router';
import { BookList } from './book-list/book-list';
import { BookAdd } from './book-add/book-add';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'add', component: BookAdd },
];
