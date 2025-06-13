import { createRoute, useNavigate } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { useState } from "react";
import { trpc } from "../trpc";

export const createFlagRoute = createRoute({
  path: "/flags/create",
  getParentRoute: () => rootRoute,
  component: CreateFlagPage,
});

function CreateFlagPage() {
  const navigate = useNavigate();
  const createFlag = trpc.createFlag.useMutation({
    onSuccess: () => navigate({ to: "/flags" }),
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createFlag.mutate({ name, description, enabled });
  };

  return (
    <div>
      <h2>Créer un nouveau flag</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Activé
        </label>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
