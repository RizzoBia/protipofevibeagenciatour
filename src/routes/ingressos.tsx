import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/CatalogPage";

export const Route = createFileRoute("/ingressos")({
  head: () => ({
    meta: [
      { title: "Ingressos para shows e jogos | Destaque Turismo" },
      { name: "description", content: "Ingressos para festivais, shows, jogos e festas de fim de ano." },
      { property: "og:title", content: "Ingressos para shows e jogos | Destaque Turismo" },
      { property: "og:description", content: "Ingressos para festivais, shows, jogos e festas de fim de ano." },
    ],
  }),
  component: () => <CatalogPage kind="ingresso" title="Ingressos" subtitle="Shows, festivais e jogos pelo Brasil." />,
});
