import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export function validate(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // todo:
    //   - Extrahiere den 'body' (Payload) aus dem Request
    //   - Validiere den body mit dem übergebenen schema
    //   - Wenn der Body ungültig ist (nicht zum schema passt),
    //     soll der Request nicht verarbeitet werden
    //     (z.B. HTTP Status Code 400 zurückliefern)
    //   - 🤔 Wenn der Body gültig ist, warum könnte es sinnvoll sein
    //     mit dem von zod zurückgelieferten, gültigen Objekt,
    //     das Feld 'req.body' zu aktualisieren?
    //

    const result = schema.safeParse(req.body);
    if (!result.success) {
      const zodError = result.error as z.ZodError;
      res.status(400).json({
        error: "Validation failed",
        details: zodError.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }
    req.body = result.data;
    //            ^--- result.data enthält NUR die Informationen,
    //                 die im zod-Schema hinterlegt sind
    //                 KEINE weiteren Daten, die evtl. im Body
    //                 angegeben wurden

    // next() muss - wenn der Body gültig ist - als letztes aufgerufen werden,
    //    damit die anderen Request-Handler verarbeitet werden.
    next();
  };
}
