// packages/api/server.ts
import express from "express";
import cors from "cors";
import { appRouter } from "./index";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();
const port = 3000;

app.use(cors());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}), // ici on peut mettre l'utilisateur plus tard
  })
);

app.listen(port, () => {
  console.log(`tRPC server running on http://localhost:${port}/trpc`);
});
