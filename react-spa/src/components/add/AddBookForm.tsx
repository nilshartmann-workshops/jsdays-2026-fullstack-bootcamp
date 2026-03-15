import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { BookSchema, CreateBook, CreateBookSchema } from "../../types.ts";

export default function AddBookForm() {
  // todo:
  //  - erzeuge mit 'useForm' eine Form-Instanz
  //    Als Argumente musst du angeben:
  //     resolver: zodResolver(CreateBookSchema),
  //     defaultValues: { authorId: "a-1" },
  //  - Verknüpfe das zurückgelieferte 'form'-Objekt mit dem
  //     Formular und dessen Eingabefeldern (s.u.)

  const form = useForm({
    resolver: zodResolver(CreateBookSchema),
    defaultValues: { authorId: "a-1" },
  });

  const mutation = useMutation({
    async mutationFn(data: CreateBook) {
      const response = await fetch(`http://localhost:3000/api/books`, {
        // todo: Request vollständig beschreiben:
        //  HTTP Methode: "POST"
        //  Headers: { content-type: "application/json" }
        //  Body: Stringifizierte Daten aus dem Formular (JSON.stringify(data))
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status !== 201) {
        throw new Error(response.statusText);
      }

      const book = await response.json();
      return BookSchema.parse(book);
    },
  });

  const handleBookFormSubmit = async (data: CreateBook) => {
    console.log("DATA", data);
    // todo: Mutation ausführen
    mutation.mutate(data);
  };

  const handleBookFormSubmitError = (err: any) => {
    console.log("ERROR", err);

    // todo OPTIONAL, nur wenn Zeit ist:
    //  - diese Funktion ist für Anwender wenig hilfreich, weil der Fehler nur auf der Konsole ausgegeben wird
    //  - zeige stattdessen (zusätzlich) die Validierungsfehler aus dem Formular jeweils direkt unter den Eingabefeldern an
    //     Fehlermeldung eines Feldes findest du unter: form.formState.errors.FELDNAME.message
    //  - danach kannst du diese Funktion löschen wenn du willst
  };

  // todo: mit dem onSubmit-Property des <form>-Elements deine Form mit den beiden handle-Funktionen verknüpfen:
  //  <form onSubmit={form.handleSubmit(handleBookFormSubmit, handleBookFormSubmitError)}>
  //
  //   - handleBookFormSubmit wird dann aufgerufen wenn der Submit Button ("Speichern") geklickt wird
  //     und ALLE Eingaben im Formular GÜLTIG sind
  //   - handleBootFormSubmitError wird aufgerufen, wenn die Eingaben NICHT gültig sind.
  //     Dann werden die Fehler auf der Kosnole ausgegeben (hilfreich bei der Entwicklung)
  return (
    <div className="p-2">
      <h1>Buch anlegen</h1>
      <form
        onSubmit={form.handleSubmit(
          handleBookFormSubmit,
          handleBookFormSubmitError,
        )}
      >
        {/* im richtigen Leben würden wir hier eine Liste von Autoren machen
        In unserer Demo machen setzen wir den Autor der einfachheithalber auf a-1
        (defaultValues bei useForm)
        */}
        <label htmlFor={"author"}>Autor</label>
        <input
          id="author"
          type={"text"}
          readOnly
          {...form.register("authorId")}
        />

        <label htmlFor={"title"}>Titel</label>
        {/* todo: input für das Feld 'title' im form registrieren */}
        <input id="title" type={"text"} {...form.register("title")} />
        <p className={"InputError"}>{form.formState.errors.title?.message}</p>

        <label htmlFor={"isbn"}>ISBN</label>
        {/* todo: input für das Feld 'isbn' im form registrieren */}
        <input id="isbn" type={"text"} {...form.register("isbn")} />
        <p className={"InputError"}>{form.formState.errors.isbn?.message}</p>

        <label htmlFor={"pages"}>Seiten</label>
        {/* todo: input für das Feld 'pages' im form registrieren
        Achtung! du musst als Option { valueAsNumber: true } beim registrieren
        angeben, damit zod den eingegebenen Wert von Zahl in String konvertiert
        */}
        <input
          id={"pages"}
          type={"number"}
          {...form.register("pages", { valueAsNumber: true })}
        />
        <p className={"InputError"}>{form.formState.errors.pages?.message}</p>

        <label htmlFor={"year"}>Jahr</label>
        {/* todo: input für das Feld 'year' im form registrieren
        Achtung! du musst als Option { valueAsNumber: true } beim registrieren
        angeben, damit zod den eingegebenen Wert von Zahl in String konvertiert
        */}
        <input
          id={"year"}
          type={"number"}
          {...form.register("year", { valueAsNumber: true })}
        />
        <p className={"InputError"}>{form.formState.errors.year?.message}</p>

        <button>Speichern</button>

        {/*
        todo OPTIONAL:
        - Gib eine Meldung aus, wenn die Mutation erfolgreich ausgeführt wurde
        - Gib eine Fehlermeldung aus, wenn die Mutation fehlerhaft war
        */}
        {mutation.isSuccess && (
          <div className="FormSuccess">
            Buch erfolgreich mit Id {mutation.data.id} gespeichert!
          </div>
        )}
        {mutation.isError && (
          <div className="FormError">
            Fehler beim Speichern. Bitte versuche es erneut.
          </div>
        )}
      </form>
    </div>
  );
}
