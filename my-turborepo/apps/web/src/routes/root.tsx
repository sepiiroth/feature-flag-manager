import { Outlet, Link, createRootRoute } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "2rem" }}>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">Accueil</Link>
          <Link to="/flags">Liste des flags</Link>
          <Link to="/flags/create">Créer un flag</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  ),
});
