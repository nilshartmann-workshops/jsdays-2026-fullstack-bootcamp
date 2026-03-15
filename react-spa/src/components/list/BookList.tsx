import { useSuspenseQuery } from "@tanstack/react-query";

import { keycloak } from "../../keycloak.ts";
import { BookListSchema } from "../../types.ts";
import BookCard from "./BookCard.tsx";

export default function BookList() {
  // getDemoBooks liefert eine Liste mit Büchern
  //  - im nächsten Schritt lesen wir die Liste vom Server
  const { data: books } = useSuspenseQuery({
    queryKey: ["books"],
    async queryFn() {
      const response = await fetch("http://localhost:3000/api/books", {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      const json = await response.json();
      return BookListSchema.parse(json);
    },
  });

  // todo: Render eine Liste von BookCard-Komponenten
  //   - die Bücher, die ausgegeben werden müssen, stehen im books-Array
  //   - verwende die JavaScript map-Funktion
  //   - jedes book soll mit der BookCard dargestellt werden
  //       (Die BookCard-Komponente musst du implementieren, s. dort)
  //   - denk' dran, dass du bei der Verwendung der BookCard in der
  //     Liste das 'key'-Attribut angeben musst!

  return (
    <div className="p-2">
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </div>
  );
}
