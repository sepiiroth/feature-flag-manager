import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <div>Bienvenue sur l’app de gestion des Feature Flags</div>,
});
