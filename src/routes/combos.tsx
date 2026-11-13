import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/CatalogPage";

export const Route = createFileRoute("/combos")({
  head: () => ({
    meta: [
      { title: "Viagem + Ingresso | Destaque Turismo" },
      { name: "description", content: "Combos com aéreo, hotel e ingresso do evento, tudo num só lugar." },
      { property: "og:title", content: "Viagem + Ingresso | Destaque Turismo" },
      { property: "og:description", content: "Combos com aéreo, hotel e ingresso do evento, tudo num só lugar." },
    ],
  }),
  component: () => <CatalogPage kind="combo" title="Viagem + Ingresso" subtitle="Vá para o evento com tudo resolvido — e pague menos que separado." />,
});
