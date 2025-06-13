import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  // 🔸 GET ALL
  getAllFlags: t.procedure.query(() => {
    return featureFlags;
  }),

  // 🔹 CREATE
  createFlag: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        enabled: z.boolean().optional(),
      })
    )
    .mutation(({ input }) => {
      const newFlag = {
        id: crypto.randomUUID(),
        name: input.name,
        description: input.description ?? "",
        enabled: input.enabled ?? false,
      };
      featureFlags.push(newFlag);
      return newFlag;
    }),

  // 🔸 UPDATE
  updateFlag: t.procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        description: z.string().optional(),
        enabled: z.boolean(),
      })
    )
    .mutation(({ input }) => {
      const index = featureFlags.findIndex((f) => f.id === input.id);
      if (index === -1) throw new Error("Flag not found");
      featureFlags[index] = { ...featureFlags[index], ...input };
      return featureFlags[index];
    }),

  // 🔻 DELETE
  deleteFlag: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const index = featureFlags.findIndex((f) => f.id === input.id);
      if (index === -1) throw new Error("Flag not found");
      const removed = featureFlags.splice(index, 1);
      return removed[0];
    }),

  // 🎉 Test de base
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `Hello ${input.name}` };
    }),
});

export type AppRouter = typeof appRouter;

type FeatureFlag = {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
};

//simulation de bdd (en mémoire)
const featureFlags: FeatureFlag[] = [];
