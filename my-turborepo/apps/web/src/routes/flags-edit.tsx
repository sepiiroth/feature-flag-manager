import { createRoute, useNavigate, useParams } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { trpc } from "../trpc";
import { useState, useEffect } from "react";

export const editFlagRoute = createRoute({
  path: "/flags/$flagId/edit",
  getParentRoute: () => rootRoute,
  component: EditFlagPage,
});

function EditFlagPage() {
  const { flagId } = useParams({ from: "/flags/$flagId/edit" });
  const navigate = useNavigate();

  const { data: flags } = trpc.getAllFlags.useQuery();
  const updateFlag = trpc.updateFlag.useMutation({
    onSuccess: () => navigate({ to: "/flags" }),
  });

  const flag = flags?.find((f) => f.id === flagId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (flag) {
      setName(flag.name);
      setDescription(flag.description ?? "");
      setEnabled(flag.enabled);
    }
  }, [flag]);

  if (!flag) return <p>Chargement du flag...</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFlag.mutate({
      id: flag.id,
      name,
      description,
      enabled,
    });
  };

  return (
    <div>
      <h2>Modifier le flag</h2>
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
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
