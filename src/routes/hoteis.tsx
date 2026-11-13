import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/CatalogPage";

export const Route = createFileRoute("/hoteis")({
  head: () => ({
    meta: [
      { title: "Hotéis e pousadas | Destaque Turismo" },
      { name: "description", content: "Hotéis, resorts e pousadas com café da manhã nos melhores destinos do Brasil." },
      { property: "og:title", content: "Hotéis e pousadas | Destaque Turismo" },
      { property: "og:description", content: "Hotéis, resorts e pousadas com café da manhã nos melhores destinos do Brasil." },
    ],
  }),
  component: () => <CatalogPage kind="hotel" title="Hotéis" subtitle="Onde ficar, com café da manhã e cancelamento fácil." />,
});
