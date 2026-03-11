import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

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
    </header>
    <div>
      <Outlet />
    </div>
  </>
);

export const Route = createRootRouteWithContext<BookstoreRouterContext>()({
  component: RootLayout,
});
