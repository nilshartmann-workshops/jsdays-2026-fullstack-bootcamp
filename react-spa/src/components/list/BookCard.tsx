import { Book } from "../../types.ts";

type BookCardProps = {
  book: Book;
};
export default function BookCard({ book }: BookCardProps) {
  // todo:
  //   - Lies das book aus den Properties
  //   - zeige die Informationen aus dem Buch an:
  //      - book.title
  //      - book.year
  //      - book.isbn
  //      - book.pages
  //
  // Als CSS-Klassen kannst du angeben:
  //  - Card (für das Root div)
  //  - CardTitle für eine Überschrift
  //  - CardInfo für einzelne Zeilen

  return (
    <div className={"Card"}>
      <h2 className={"CardTitle"}>{book.title}</h2>
      <p className={"CardInfo"}>Veröffentlicht: {book.year}</p>
      <p className={"CardInfo"}>ISBN: {book.isbn}</p>
      <p className={"CardInfo"}>{book.pages} Pages</p>
    </div>
  );
}
