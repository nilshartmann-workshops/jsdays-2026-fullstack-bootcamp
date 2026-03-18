import { Book } from './book.model';

export function getDemoBooks(): Book[] {
  return [
    {
      id: 'b-1',
      authorId: 'a-1',
      title: 'To Kill a Mockingbird',
      isbn: '978-0-06-112008-4',
      pages: 281,
      year: 1960,
    },
    {
      id: 'b-2',
      authorId: 'a-1',
      title: 'Go Set a Watchman',
      isbn: '978-0-06-240985-0',
      pages: 278,
      year: 2015,
    },
    {
      id: 'b-3',
      authorId: '159084a9-9b44-4c01-adbf-e1eb328ad0cc',
      title: '1984',
      isbn: '978-0-451-52493-5',
      pages: 328,
      year: 1949,
    },
  ];
}
