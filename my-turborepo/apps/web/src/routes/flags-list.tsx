import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { FeatureFlagsDashboard } from "../FeatureFlagsDashboard";

export const flagsRoute = createRoute({
  path: "/flags",
  getParentRoute: () => rootRoute,
  component: FeatureFlagsDashboard,
});
