# Übung: Ein Formular mit react-hook-form

# Schritte

** Vervollständige das Formular in `src/components/add/AddBookForm.tsx`.**: 
- Du findest dort eine Reihe von TODOs

1. Am besten zunächst das Formular wie beschrieben vervollständigen, dann die Mutation implementieren
   - Wenn du die beiden Submit-Handler handleBookFormSubmit und handleBookFormSubmitError angegeben hast, wird eine der beiden Funktionen beim Submit (Klick auf "Speichern"-Button) aufgerufen:
     - `handleBookFormSubmit` wird mit den aktuellen Daten aus dem Formular aufgerufen, wenn die Daten alle gültig sind (und das Formular korrekt implementiert ist...)
     - `handleBookFormSubmitError` wird von react-hook-form aufgerufen, wenn Submitted wird, das Formular aber ungültige Eingaben enthält. Diese Funktion bietet sich zur Fehleranalyse beim Entwickeln an, weil sie die Fehler im Formular auf der Konsole ausgibt. Wenn das Formular korrekte Eingaben enthält, aber trotzdem diese Funktion aufgerufen wird, ist es oft ein Zeichen dafür, dass ein Feld nicht korrekt mit der form-Instanz verkünpft wurde
2. Wenn du das Formular korrekt implementiert hast, so dass die handleBookFormSubmit aufgerufen wird, wenn das Formular gültige Daten enthält, vervollständige die Mutation (`mutationFn`)
3. **Optional**, wenn noch Zeit ist:
   - Du kannst unter den Feldern des Formulars die Validierungsfehlermeldung ausgeben lassen
   - Du kannst eine (Fehler-)Meldung ausgeben, wenn die Mutation ausgeführt wurde 
# Material

# React Hook Form
- `useForm`: https://react-hook-form.com/docs/useform
    - resolver: https://react-hook-form.com/docs/useform#resolver
        - `zodResolver`: https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod
    - `register`: https://react-hook-form.com/docs/useform/register
        - siehe dort auch `valueAsNumber` für die `number`-Felder (`pages`, `year`)
    - `handleSubmit`: https://react-hook-form.com/docs/useform/handlesubmit

# TanStack Query Mutations
- https://tanstack.com/query/v5/docs/framework/react/guides/mutations


