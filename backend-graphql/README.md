# Backend — Bookstore GraphQL API

Node.js + TypeScript GraphQL API for managing books, authors and comments.

## Tech Stack

- **Runtime**: Node.js / TypeScript
- **Framework**: Apollo GraphQL Server (and GraphQL codegen)
- **Database**: SQLite (sql.js)

## Getting Started

```bash
npm install
npm run dev       # dev server with hot-reload (nodemon + ts-node) and codegenerator
```

The server starts on **http://localhost:4000**.  
The SQLite database (`data-graphql.db`) is created and seeded automatically on first run.

## Data Model

```
Book n--1 Author
```


## Project Structure

```
src/
├── app.ts                  # GraphQL server configuration, schema and resolver setup
├── context.ts              # GraphQL Context object (type def and creation)
├── server.ts               # Entry point
├── database/
│   ├── database.ts         # SQLite connection
│   ├── init.ts             # Table creation
│   └── seed.ts             # Seed data (5 authors, 10 books, 15 comments)
└── modules/
    ├── authors/             # resolvers  · schemas · db types
    └── books/               # resolvers  · schemas · db types
```

## Example Queries

You can run GraphQL queries against your backend using the [Apollo Sandbox](https://www.apollographql.com/docs/graphos/platform/sandbox) at **http://localhost:4000**

At the beginning there is already one resolver configured that allowes you to list all authors:

```graphql
query {
    books {
        id
        title
        
        # note: books field does not work yet, we have to implement it first.
    }
}
```


## Development process

1. Enhance your GraphQL schema (look for `.schema.graphql` files)
2. When saving a modified GraphQL schema file, the codegenerator will run
3. Depending on your IDE the newly generated typescript types might **not be picked up by your IDE** automatically
   - In Webstorm it helps, to reload all files _or_ Restart TypeScript Language Service (All Actions -> Restart TypeScript Language Service)
   - VS Code normally recognizes changes immediately
4. Implement resolving logic in your resolver file (`.resolvers.ts`)