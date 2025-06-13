// apps/web/src/FeatureFlagsDashboard.tsx
import { trpc } from "./trpc";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function FeatureFlagsDashboard() {
  const utils = trpc.useUtils();

  // 🟢 Query : récupère tous les flags
  const { data: flags, isLoading } = trpc.getAllFlags.useQuery();

  // 🔵 Mutation : créer un flag
  const createFlag = trpc.createFlag.useMutation({
    onSuccess: () => utils.getAllFlags.invalidate(),
    onError: (err) => {
      console.error("Erreur tRPC côté client :", err);
    },
  });

  // 🔴 Mutation : supprimer un flag
  const deleteFlag = trpc.deleteFlag.useMutation({
    onSuccess: () => utils.getAllFlags.invalidate(),
  });

  // Modification : modifier un flag

  const updateFlag = trpc.updateFlag.useMutation({
    onSuccess: () => utils.getAllFlags.invalidate(),
  });

  // 📝 Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!name) return;

    console.log(name, description);
    createFlag.mutate({ name, description, enabled: false });
    setName("");
    setDescription("");
  };

  const [editingFlagId, setEditingFlagId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editEnabled, setEditEnabled] = useState(false);

  if (isLoading) return <p>Chargement des flags...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Feature Flags</h2>

      {/* Liste */}
      <ul>
        {flags?.map((flag) => (
          <li key={flag.id}>
            {editingFlagId === flag.id ? (
              // Formulaire d'édition
              <div>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Nom"
                />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={editEnabled}
                    onChange={(e) => setEditEnabled(e.target.checked)}
                  />
                  Activé
                </label>
                <button
                  onClick={() => {
                    updateFlag.mutate({
                      id: flag.id,
                      name: editName,
                      description: editDescription,
                      enabled: editEnabled,
                    });
                    setEditingFlagId(null);
                  }}
                >
                  Enregistrer
                </button>
                <button onClick={() => setEditingFlagId(null)}>Annuler</button>
              </div>
            ) : (
              // Affichage normal
              <div>
                <strong>{flag.name}</strong> — {flag.description} —{" "}
                {flag.enabled ? "✅ Activé" : "❌ Désactivé"}
                <Link to={`/flags/${flag.id}/edit`}>Modifier</Link>
                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      `Confirmer la suppression du flag "${flag.name}" ?`
                    );
                    if (confirmed) {
                      deleteFlag.mutate({ id: flag.id });
                    }
                  }}
                >
                  Supprimer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          createFlag.mutate({
            name: "Test via bouton",
            description: "Depuis le bouton",
            enabled: false,
          });
        }}
      >
        Créer un flag test
      </button>

      {/* Formulaire de création */}
      <h3>Créer un nouveau flag</h3>
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
      <button onClick={handleCreate}>Créer</button>
    </div>
  );
}
