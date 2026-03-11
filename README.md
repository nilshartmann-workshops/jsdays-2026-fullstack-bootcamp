# JS Days 2026 Fullstack Workshop 👋

Dieses Repository enthält den Workspace für unsere Übungen. Du benötigst:

- Node.js Version 24.x (LTS)
- Git zum Klonen des Repositories
- Internet-Zugang zum Installieren der npm Packages
- Einen Editor oder IDE (z.B. VS Code oder Webstorm) für die Übungen
  - Empfehlung: AI-Tools während des Workshops ausschalten!

## Übungen

Wir machen gemeinsam ein paar Übungen. Wir werden dir jeweils ein Thema vorführen und dabei Code schreiben, den wir hinterher committen. Während der Übung machst du dann jeweils (fast) dasselbe, was wir dir vorher gezeigt haben.

- Während wir dir ein Thema zeigen/programmieren, musst du nichts machen. Einfach nur zusehen und gerne Fragen stellen, Meinungen äußern, ... ☺️
- Danach hast du Zeit für die Übung.
  - Wenn es während der Übungen Fragen oder Probleme gibt, zöger bitte nicht, uns anzusprechen, andere aus der Gruppe zu fragen oder in unsere Lösung auf GitHub zu schauen (s.u.).
  - Wir sind ja nicht in der Schule bei einer Klassenarbeit. Ihr dürft gerne zusammenarbeiten 😉

## Anwendungen

Wir werden insgesamt vier Anwendungen bauen. Jede dieser vier Anwendungen liegt in einem eigenen Verzeichnis:

1. **backend**: Eine Express.js-Anwendung mit einer REST API
   - URL: http://localhost:3000
2. **backend-graphql**: Eine GraphQL API mit dem Apollo GraphQL Server
   - URL: http://localhost:4000
3. **angular-spa**: Eine Angular App, die die REST API konsumiert
   - URL: http://localhost:4200
4. **react-spa**: Eine React App, die die REST API konsumiert

- URL: http://localhost:5100

> ⚠️ Stelle bitte sicher, dass die vier erforderlichen Ports (`3000`, `4000`, `5200` und `5100`) bei dir verfügbar sind.

## Branches

Es gibt in diesem Repository mehrere Branches:

- [`main`](https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/main): Das ist der Default-Branch mit der Ausgangsbasis für unsere Übungen. Auf diesem Branch musst du arbeiten.
- [`live_coding`](https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/tree/live_coding): Hier werden wir den Code, den wir bauen jeweils committen. Du kannst diesen Diff-Ansicht in GitHub öffnen, um während der Übungen (z.B. bei Problemen) auf unseren Code zu schauen. Dort findest du jeweils auch die Übungsbeschreibungen:
  - Zur [Commit-Liste in GitHub](https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/commits/live_coding/)
- [`prepare`](https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/commits/prepare/): Hier gibt es ebenfalls Schritt-für-Schritt-Commits mit den Themen die wir für diesen Workshop vorbereitet haben. **Spolier-Warnung**: Wenn du dich überraschen lassen willst, was wir im Workshop alles besprechen wollen, guckst du dir diesen Branch _nicht_ an 🫣😉

> 💡Du solltest "unseren" Live-Coding-Branch bei dir im Browser öffnen, damit du bei den Übungen darauf Zugriff hast, wenn du z.B. die Übungsanleitung lesen willst, oder im Fall von Problemen nachschauen willst, wie wir eine Aufgabe jeweils umgesetzt haben:
>
> 👉 https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp/commits/live_coding/

## Installation

Bitte klone das Repository von GitHub:

```bash
git clone https://github.com/nilshartmann-workshops/jsdays-2026-fullstack-bootcamp.git
```

Dann installier bitte die npm Packages in folgenden vier Verzeichnissen:

- `backend`
- `backend-graphql`
- `angular-spa`
- `react-spa`

In jedem der vier Verzeichnisse bitte `npm install` ausführen.

## Starten

Damit es gleich losgehen kann, kannst du das Express-Backend schon starten:

```bash
cd backend
npm run dev
```

## Entwicklung

Die Start-Scripte der Anwendungen lauten jeweils `npm run dev` (Bei Angular: `npm start`). Damit wird auch immer ein Prozess gestartet, der dafür sorgt, dass bei Änderungen die Anwendung neugestartet wird (Backends) bzw. im Browser aktualisiert wird (Hotreload bei Angular bzw. React).
Wenn du Änderungen am Code machst und speicherst, sollte die jeweilige Anwendung also immer automatisch aktualisiert werden, ohne dass du neustarten musst.

## Hilfe

Wenn du (während einer Übung) Hilfe brauchst, kannst du uns natürlich jederzeit ansprechen.
