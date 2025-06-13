// apps/web/src/FeatureFlagsDashboard.tsx
import { trpc } from "./trpc";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import styled from "@emotion/styled";

const FlagCard = styled.li`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  list-style: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin: 0.25rem 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-top: 0.5rem;

  &:hover {
    background: #005dd1;
  }
`;

const FlagHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlagMeta = styled.p`
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #555;
`;

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
    <PageWrapper>
      <Title>Feature Flags</Title>

      {/* Liste */}
      <ul>
        {flags?.map((flag) => (
          <FlagCard key={flag.id}>
            {editingFlagId === flag.id ? (
              <>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Nom"
                />
                <Input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                />
                <Label>
                  <input
                    type="checkbox"
                    checked={editEnabled}
                    onChange={(e) => setEditEnabled(e.target.checked)}
                  />
                  Activé
                </Label>
                <ButtonRow>
                  <Button
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
                  </Button>
                  <Button onClick={() => setEditingFlagId(null)}>
                    Annuler
                  </Button>
                </ButtonRow>
              </>
            ) : (
              <>
                <FlagHeader>
                  <strong>{flag.name}</strong>
                  <span>{flag.enabled ? "✅ Activé" : "❌ Désactivé"}</span>
                </FlagHeader>
                <FlagMeta>{flag.description}</FlagMeta>
                <ButtonRow>
                  <Link to={`/flags/${flag.id}/edit`}>Modifier</Link>
                  <Button
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Confirmer la suppression du flag "${flag.name}" ?`
                      );
                      if (confirmed) deleteFlag.mutate({ id: flag.id });
                    }}
                  >
                    Supprimer
                  </Button>
                </ButtonRow>
              </>
            )}
          </FlagCard>
        ))}
      </ul>

      {/* Formulaire de création */}
      <Title>Créer un nouveau flag</Title>
      <Input
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleCreate}>Créer</Button>
    </PageWrapper>
  );
}
