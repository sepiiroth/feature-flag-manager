import { rootRoute } from "./root";
import { flagsRoute } from "./flags-list";
import { createFlagRoute } from "./flags-create";
import { editFlagRoute } from "./flags-edit";
import { homeRoute } from "./home";
import { createRouter } from "@tanstack/react-router";

const routeTree = rootRoute.addChildren([
  homeRoute,
  flagsRoute,
  createFlagRoute,
  editFlagRoute,
]);

export const router = createRouter({ routeTree });
