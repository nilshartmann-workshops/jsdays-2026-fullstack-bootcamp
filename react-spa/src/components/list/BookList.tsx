import { getDemoBooks } from "../../demo-data.ts";
import { Book } from "../../types.ts";

export default function BookList() {
  // getDemoBooks liefert eine Liste mit Büchern
  //  - im nächsten Schritt lesen wir die Liste vom Server
  const books: Book[] = getDemoBooks();

  // todo: Render eine Liste von BookCard-Komponenten
  //   - die Bücher, die ausgegeben werden müssen, stehen im books-Array
  //   - verwende die JavaScript map-Funktion
  //   - jedes book soll mit der BookCard dargestellt werden
  //       (Die BookCard-Komponente musst du implementieren, s. dort)
  //   - denk' dran, dass du bei der Verwendung der BookCard in der
  //     Liste das 'key'-Attribut angeben musst!

  return <div className="p-2">todo: Bücherliste anzeigen!</div>;
}
