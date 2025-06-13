import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "../../api/";
import { inferProcedureInput } from "@trpc/server";

// permet d'appeler les routes tRPC sans serveur
const caller = appRouter.createCaller({});

describe("Feature Flags tRPC procedures", () => {
  beforeEach(() => {
    // reset simulation de BDD si besoin (dans le vrai code, tu rendrais ça injectable)
  });

  it("should create a flag", async () => {
    const input: inferProcedureInput<typeof appRouter.createFlag> = {
      name: "Test Flag",
      description: "Juste un test",
      enabled: true,
    };

    const created = await caller.createFlag(input);

    expect(created).toMatchObject({
      name: "Test Flag",
      description: "Juste un test",
      enabled: true,
    });

    expect(created.id).toBeDefined();
  });

  it("should return all flags", async () => {
    const all = await caller.getAllFlags();
    expect(Array.isArray(all)).toBe(true);
  });

  it("should update a flag", async () => {
    const newFlag = await caller.createFlag({
      name: "Temp",
      enabled: false,
      description: "",
    });

    const updated = await caller.updateFlag({
      id: newFlag.id,
      name: "Temp updated",
      enabled: true,
      description: "Updated desc",
    });

    expect(updated.name).toBe("Temp updated");
    expect(updated.enabled).toBe(true);
  });

  it("should delete a flag", async () => {
    const created = await caller.createFlag({
      name: "To delete",
      enabled: false,
      description: "",
    });

    const deleted = await caller.deleteFlag({ id: created.id });

    expect(deleted.id).toBe(created.id);
  });
});
