// apps/web/src/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../packages/api";

export const trpc = createTRPCReact<AppRouter>();
