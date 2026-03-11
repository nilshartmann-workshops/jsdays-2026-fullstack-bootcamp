import { Database } from "sql.js";
import { v4 as uuidv4 } from "uuid";

export function seed(db: Database): void {
  // --- Authors & Addresses ---
  const authorHarper = "a-1";
  db.run("INSERT INTO authors (id, firstName, lastName) VALUES (?, ?, ?)", [
    authorHarper,
    "Harper",
    "Lee",
  ]);
  db.run(
    "INSERT INTO addresses (id, authorId, street, city, zip, country) VALUES (?, ?, ?, ?, ?, ?)",
    [uuidv4(), authorHarper, "425 Madison Avenue", "New York", "10017", "USA"],
  );

  const authorOrwell = uuidv4();
  db.run("INSERT INTO authors (id, firstName, lastName) VALUES (?, ?, ?)", [
    authorOrwell,
    "George",
    "Orwell",
  ]);
  db.run(
    "INSERT INTO addresses (id, authorId, street, city, zip, country) VALUES (?, ?, ?, ?, ?, ?)",
    [
      uuidv4(),
      authorOrwell,
      "27B Canonbury Square",
      "London",
      "N1 2AN",
      "United Kingdom",
    ],
  );

  const authorTolkien = "a-2";
  db.run("INSERT INTO authors (id, firstName, lastName) VALUES (?, ?, ?)", [
    authorTolkien,
    "J.R.R.",
    "Tolkien",
  ]);
  db.run(
    "INSERT INTO addresses (id, authorId, street, city, zip, country) VALUES (?, ?, ?, ?, ?, ?)",
    [
      uuidv4(),
      authorTolkien,
      "20 Northmoor Road",
      "Oxford",
      "OX2 6JA",
      "United Kingdom",
    ],
  );

  const authorAusten = "a-3";
  db.run("INSERT INTO authors (id, firstName, lastName) VALUES (?, ?, ?)", [
    authorAusten,
    "Jane",
    "Austen",
  ]);
  db.run(
    "INSERT INTO addresses (id, authorId, street, city, zip, country) VALUES (?, ?, ?, ?, ?, ?)",
    [
      uuidv4(),
      authorAusten,
      "Chawton Cottage",
      "Alton",
      "GU34 1SD",
      "United Kingdom",
    ],
  );

  const authorMarquez = "a-4";
  db.run("INSERT INTO authors (id, firstName, lastName) VALUES (?, ?, ?)", [
    authorMarquez,
    "Gabriel",
    "García Márquez",
  ]);
  db.run(
    "INSERT INTO addresses (id, authorId, street, city, zip, country) VALUES (?, ?, ?, ?, ?, ?)",
    [uuidv4(), authorMarquez, "Calle 87", "Mexico City", "06600", "Mexico"],
  );

  // --- Books ---
  const bookMockingbird = "b-1";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [
      bookMockingbird,
      authorHarper,
      "To Kill a Mockingbird",
      "978-0-06-112008-4",
      281,
      1960,
    ],
  );

  const bookWatchman = "b-2";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [
      bookWatchman,
      authorHarper,
      "Go Set a Watchman",
      "978-0-06-240985-0",
      278,
      2015,
    ],
  );

  const book1984 = "b-3";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [book1984, authorOrwell, "1984", "978-0-451-52493-5", 328, 1949],
  );

  const bookAnimalFarm = "b-4";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [
      bookAnimalFarm,
      authorOrwell,
      "Animal Farm",
      "978-0-451-52634-2",
      112,
      1945,
    ],
  );

  const bookHobbit = "b-5";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [bookHobbit, authorTolkien, "The Hobbit", "978-0-547-92822-7", 310, 1937],
  );

  const bookLotr = "b-6";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [
      bookLotr,
      authorTolkien,
      "The Lord of the Rings",
      "978-0-618-64015-7",
      1178,
      1954,
    ],
  );

  const bookPride = "b-7";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [
      bookPride,
      authorAusten,
      "Pride and Prejudice",
      "978-0-14-143951-8",
      432,
      1813,
    ],
  );

  const bookSense = "b-8";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [
      bookSense,
      authorAusten,
      "Sense and Sensibility",
      "978-0-14-143966-2",
      409,
      1811,
    ],
  );

  const bookSolitude = "b-9";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [
      bookSolitude,
      authorMarquez,
      "One Hundred Years of Solitude",
      "978-0-06-088328-7",
      417,
      1967,
    ],
  );

  const bookCholera = "b-10";
  db.run(
    "INSERT INTO books (id, authorId, title, isbn, pages, year) VALUES (?, ?, ?, ?, ?, ?)",
    [
      bookCholera,
      authorMarquez,
      "Love in the Time of Cholera",
      "978-0-307-38962-7",
      348,
      1985,
    ],
  );

  // --- Comments ---
  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-1",
      bookMockingbird,
      "Alice Johnson",
      "A timeless classic that everyone should read. The characters feel so real.",
      5,
      "2025-01-15T10:30:00Z",
    ],
  );
  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-2",
      bookMockingbird,
      "Bob Smith",
      "Powerful storytelling. It changed my perspective on justice.",
      5,
      "2025-02-20T14:15:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-3",
      book1984,
      "Carol White",
      "Terrifyingly relevant even today. Orwell was a visionary.",
      5,
      "2025-03-10T09:00:00Z",
    ],
  );
  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-4",
      book1984,
      "David Brown",
      "A must-read dystopian novel. The world-building is incredible.",
      4,
      "2025-04-05T16:45:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-5",
      bookHobbit,
      "Eve Martinez",
      "A wonderful adventure story. I read it to my kids every year.",
      5,
      "2025-05-12T11:20:00Z",
    ],
  );
  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-6",
      bookHobbit,
      "Frank Wilson",
      "The beginning of an epic journey. Tolkien at his finest.",
      4,
      "2025-06-18T13:30:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-7",
      bookLotr,
      "Grace Lee",
      "The greatest fantasy epic ever written, in my opinion. Absolutely breathtaking.",
      5,
      "2025-07-22T08:00:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-8",
      bookPride,
      "Henry Taylor",
      "Austen's wit is unmatched. Mr. Darcy is an iconic character.",
      5,
      "2025-08-30T10:10:00Z",
    ],
  );
  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-9",
      bookPride,
      "Irene Adams",
      "A delightful romance with sharp social commentary.",
      4,
      "2025-09-14T17:00:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-10",
      bookSolitude,
      "James Garcia",
      "Magical realism at its best. A rich, multi-generational saga.",
      5,
      "2025-10-01T12:00:00Z",
    ],
  );
  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-11",
      bookSolitude,
      "Karen Robinson",
      "Dense but rewarding. You discover new things on every re-read.",
      4,
      "2025-11-05T15:30:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-12",
      bookAnimalFarm,
      "Leo Chen",
      "A brilliant political allegory that is still relevant.",
      5,
      "2025-12-10T09:45:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-13",
      bookCholera,
      "Maria Lopez",
      "A beautiful love story spanning decades. Truly moving.",
      5,
      "2025-06-20T14:00:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-14",
      bookWatchman,
      "Nathan Park",
      "Interesting to see Scout as an adult. A controversial but thought-provoking read.",
      3,
      "2025-07-15T10:00:00Z",
    ],
  );

  db.run(
    "INSERT INTO comments (id, bookId, name, text, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
    [
      "c-15",
      bookSense,
      "Olivia Kim",
      "A charming story of two sisters with very different temperaments.",
      4,
      "2025-08-25T11:30:00Z",
    ],
  );
}
