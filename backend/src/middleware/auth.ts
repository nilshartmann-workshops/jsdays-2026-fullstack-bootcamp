import { Request, Response, NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify, JWTPayload } from "jose";

/**
 * Validates the JWT signature using Keycloak's public key (JWKS).
 * Ensures the token was actually issued by Keycloak and hasn't been tampered with.
 */
export function validateSignature() {
  const { issuer } = getKeycloakConfig();

  console.log(
    `🔐 Signature validation middleware enabled (JWKS: ${issuer}/protocol/openid-connect/certs)`,
  );

  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    // TODO:
    //  - Token aus dem Request validieren lassen und Payload extrahieren
    //     mit:
    //      const keycloakPayload = await extractPayloadFromToken(req);
    //
    //  - Wenn kein Payload zurückgeliefert wird (null),
    //     HTTP Status Code 401 mit einer `error`-Message an den Client liefern
    //  - Wenn Payload zurückgeliefert wird ist das Token vorhanden und gültig
    //  - Mit den Informationen aus dem Payload ein `user`-Objekt erzeugen
    //     (TypeScript Type: `AuthenticatedUser`)
    //  - das `user`-Objekt als `user`-Property an das `req`-Objekt setzen
    //  - next() aufrufen

    const keycloakPayload = await extractPayloadFromToken(req);

    if (!keycloakPayload) {
      res.status(401).json({ error: "No token or invalid token provided" });
      return;
    }

    req.user = {
      email: keycloakPayload.email,
      username: keycloakPayload.preferred_username,
      roles: keycloakPayload.realm_access?.roles ?? [],
    };

    next();
  };
}

export function meRoute(req: Request, res: Response) {
  if (!("user" in req) || !req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const user = req.user;

  res.json(user);
}

/**
 * Authorization middleware: Checks if the authenticated user has the required role.
 * Must be used after verifyToken/validateSignature.
 */
export function requireRole(role: string) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    // TODO:
    //
    //  - user aus dem Request lesen
    //  - Prüfen, ob der user die übergebene Rolle enthält
    //  - Falls kein User vorhanden ist oder der User die Rolle nicht hat,
    //      HTTP Status 401 UNAUTHORIZED zurückliefern
    //  - Ansonsten next() aufrufen
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!user.roles.includes(role)) {
      res.status(403).json({ error: `Role '${role}' required` });
      return;
    }

    next();
  };
}

interface KeycloakTokenPayload extends JWTPayload {
  email?: string;
  preferred_username?: string;
  realm_access?: {
    roles?: string[];
  };
}

export interface AuthenticatedUser {
  email?: string;
  username?: string;
  roles: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

function getKeycloakConfig() {
  const keycloakUrl = process.env.KEYCLOAK_URL;
  const realm = process.env.KEYCLOAK_REALM;
  const audience = process.env.KEYCLOAK_AUDIENCE;

  if (!keycloakUrl || !realm || !audience) {
    throw new Error(
      "KEYCLOAK_URL, KEYCLOAK_REALM and KEYCLOAK_AUDIENCE must be set in environment variables",
    );
  }

  const issuer = `${keycloakUrl}/realms/${realm}`;
  return { keycloakUrl, realm, audience, issuer };
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

async function extractPayloadFromToken(
  req: Request,
): Promise<KeycloakTokenPayload | null> {
  const { issuer, audience } = getKeycloakConfig();

  function fetchJWKS() {
    if (jwks) {
      return jwks;
    }

    jwks = createRemoteJWKSet(
      new URL(`${issuer}/protocol/openid-connect/certs`),
    );
    return jwks;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.warn("No 'authorization' header in request found.");
    return null;
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.warn(
      "Authorization-Header-Value does not start with  'Bearer'",
      authHeader,
    );
    return null;
  }

  const token = authHeader.slice(7);
  if (!token) {
    console.warn("No token in Authorization-Header found.");
    return null;
  }

  const { payload } = await jwtVerify(token, fetchJWKS(), {
    algorithms: ["RS256"],
    issuer,
    audience,
  });

  return payload as KeycloakTokenPayload;
}
