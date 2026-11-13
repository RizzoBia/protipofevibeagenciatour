import type { ReactNode } from "react";
import { products, type Kind, type Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function CatalogPage({
  kind,
  title,
  subtitle,
  filter,
  children,
}: {
  kind: Kind;
  title: string;
  subtitle: string;
  filter?: (p: Product) => boolean;
  children?: ReactNode;
}) {
  const list = products.filter((p) => p.kind === kind && (!filter || filter(p)));
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8">
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
      {children}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      {list.length === 0 && <p className="mt-8 rounded-3xl bg-muted p-8 text-center text-muted-foreground">Nenhum resultado para essa busca.</p>}
    </main>
  );
}
