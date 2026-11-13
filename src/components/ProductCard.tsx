import { Link } from "@tanstack/react-router";
import { Bus, Plane, MapPin } from "lucide-react";
import { brl, kindInfo, type Product } from "@/lib/catalog";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/produto/$id"
      params={{ id: p.id }}
      className="group relative block aspect-[4/5] w-full shrink-0 overflow-hidden rounded-3xl shadow-card"
    >
      <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-hero-fade" />
      {p.tag && <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur">{p.tag}</span>}
      <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
        <div className="flex items-center gap-1.5 text-xs opacity-90">
          {p.mode === "aviao" ? <Plane className="h-3.5 w-3.5" /> : p.mode === "onibus" ? <Bus className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
          {p.place}{p.duration ? ` · ${p.duration}` : ""}
        </div>
        <h3 className="mt-1 font-display text-xl font-bold leading-tight">{p.title}</h3>
        <p className="mt-1 text-sm opacity-80">{p.detail}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            {p.oldPrice && <span className="mr-2 text-xs line-through opacity-70">{brl(p.oldPrice)}</span>}
            <span className="font-display text-2xl font-bold text-highlight">{brl(p.price)}</span>
            <span className="ml-1 text-xs opacity-80">{kindInfo[p.kind].unit}</span>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-highlight font-bold text-highlight-foreground transition group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
