# Backend — Bookstore REST API

Node.js + TypeScript REST API for managing books, authors, addresses, and comments.

## Tech Stack

- **Runtime**: Node.js / TypeScript
- **Framework**: Express + CORS
- **Database**: SQLite (sql.js)

## Getting Started

```bash
npm install
npm run dev       # dev server with hot-reload (nodemon + ts-node)
npm run build     # compile to dist/
npm start         # run compiled version
```

The server starts on **http://localhost:3000**.  
The SQLite database (`data.db`) is created and seeded automatically on first run.

## Data Model

```
Author 1──n Book
```

| Entity    | Fields                                              |
|-----------|-----------------------------------------------------|
| Author    | `id`, `firstName`, `lastName`                       |
| Address   | `id`, `authorId`, `street`, `city`, `zip`, `country`|
| Book      | `id`, `authorId`, `title`, `isbn`, `pages`, `year`  |
| Comment   | `id`, `bookId`, `name`, `text`, `rating`, `createdAt`|

## API Endpoints

### Authors `/api/authors`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | List all authors |
| GET    | `/:id`   | Get author with nested address & books |
| POST   | `/`      | Create author |
| PUT    | `/:id`   | Update author |
| DELETE | `/:id`   | Delete author |

### Books `/api/books`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | List all books |
| GET    | `/:id`   | Get book with nested comments |
| POST   | `/`      | Create book |
| PUT    | `/:id`   | Update book |
| DELETE | `/:id`   | Delete book |

## Project Structure

```
src/
├── app.ts                  # Express app, middleware, route registration
├── server.ts               # Entry point
├── database/
│   ├── database.ts         # SQLite connection
│   ├── init.ts             # Table creation
│   └── seed.ts             # Seed data (5 authors, 10 books, 15 comments)
└── modules/
    ├── authors/             # model · controller · routes
    └── books/               # model · controller · routes
```

## Authorization

- Keycloak URL can be set in `.env` file
- Authorization by default **is turned off**
- In `.env` authorization can be enabled using the `ENABLE_AUTH` var
- When authentication is enabled:
  - You can request an access token from the configured keycloak instance by running:
    - ```bash
       node get-token.js susi pw_susi
       node get-token.js admin pw_admin
       ```
  - You can make a request to a "protected" route to see the user data (will be returned as response payload):
      - ```bash
        ./get-me.sh ACCESS_TOKEN
       ```

