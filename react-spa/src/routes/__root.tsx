import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

import { keycloak } from "../keycloak.ts";

type BookstoreRouterContext = {
  queryClient: QueryClient;
};

const RootLayout = () => (
  <>
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add">Buch anlegen</Link>
      </nav>
      <ProfileCard />
    </header>
    <div>
      <Outlet />
    </div>
  </>
);

function ProfileCard() {
  const username = keycloak.tokenParsed?.preferred_username;
  const roles = keycloak.realmAccess?.roles || [];

  return (
    <div className="flex items-center gap-x-2 rounded border p-4">
      <div>
        <strong>Benutzer:</strong> {username}
      </div>
      {roles.length > 0 && (
        <div>
          <strong>Rollen:</strong> {roles.join(", ")}
        </div>
      )}
      <button onClick={() => keycloak.logout()} className="Link">
        Logout
      </button>
    </div>
  );
}

export const Route = createRootRouteWithContext<BookstoreRouterContext>()({
  component: RootLayout,
});
