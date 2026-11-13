import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bus, Plane, ArrowLeftRight, Clock, Repeat, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { CatalogPage } from "@/components/CatalogPage";
import { brl, cabinInfo, type Mode, type Product } from "@/lib/catalog";
import { airports, cityLabel, findAirport, searchBuses, searchFlights, type City, type TripResult } from "@/lib/rotas";
import { useCart } from "@/lib/cart";
import rio from "@/assets/rio.jpg";
import praia from "@/assets/praia.jpg";

export const Route = createFileRoute("/passagens")({
  head: () => ({
    meta: [
      { title: "Passagens de avião e ônibus | Destaque Turismo" },
      { name: "description", content: "Passagens aéreas para todos os grandes aeroportos do Brasil e de ônibus para qualquer cidade, diretas ou com conexão." },
      { property: "og:title", content: "Passagens de avião e ônibus | Destaque Turismo" },
      { property: "og:description", content: "Voos e ônibus para todo o Brasil, diretos ou com conexão." },
    ],
  }),
  component: Passagens,
});

const sortedAirports = [...airports].sort((a, b) => a.city.localeCompare(b.city) || a.iata.localeCompare(b.iata));

function CityInput({ label, cities, value, onChange }: { label: string; cities: City[]; value: City | null; onChange: (c: City | null) => void }) {
  const [q, setQ] = useState(value ? cityLabel(value) : "");
  const [open, setOpen] = useState(false);
  useEffect(() => setQ(value ? cityLabel(value) : ""), [value]);
  const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const matches = useMemo(() => {
    const n = norm(q.trim());
    if (n.length < 2) return [];
    return cities.filter((c) => norm(cityLabel(c)).startsWith(n)).concat(cities.filter((c) => !norm(cityLabel(c)).startsWith(n) && norm(c[0]).includes(n))).slice(0, 8);
  }, [q, cities]);
  return (
    <label className="relative block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); onChange(null); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={cities.length ? "Digite a cidade" : "Carregando cidades..."}
        className="mt-1 w-full rounded-2xl border bg-background px-4 py-3 font-medium"
      />
      {open && matches.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-2xl border bg-popover p-1 shadow-card">
          {matches.map((c) => (
            <li key={cityLabel(c)}>
              <button type="button" onMouseDown={() => { onChange(c); setOpen(false); }} className="w-full rounded-xl px-3 py-2 text-left hover:bg-muted">
                {c[0]} <span className="text-muted-foreground">- {c[1]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </label>
  );
}

function ResultCard({ r, from, to, mode }: { r: TripResult; from: string; to: string; mode: Mode }) {
  const { addCustom } = useCart();
  const options = mode === "aviao"
    ? (r.cabins ?? ["economica"]).map((c) => ({ label: cabinInfo[c].label, price: Math.round(r.price * cabinInfo[c].factor) }))
    : [{ label: "Convencional", price: r.price }, { label: "Leito", price: r.price + 60 }];
  const [opt, setOpt] = useState(0);
  const stop = r.direct ? "Direto" : `1 conexão em ${r.via}`;
  const product: Product = {
    id: r.id, kind: "passagem", mode, title: `${from} → ${to}`, from, to,
    place: mode === "aviao" ? "Passagem aérea" : "Passagem de ônibus", detail: stop, duration: r.duration,
    price: options[0]!.price, image: mode === "aviao" ? rio : praia,
  };
  return (
    <div className="rounded-3xl bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${r.direct ? "bg-highlight text-highlight-foreground" : "bg-muted text-foreground"}`}>
          {r.direct ? <ArrowRight className="h-3.5 w-3.5" /> : <Repeat className="h-3.5 w-3.5" />}{stop}
        </span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" />{r.duration}</span>
      </div>
      <div className="mt-3 font-display text-lg font-bold">{from} → {to}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <button key={o.label} onClick={() => setOpt(i)} className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${i === opt ? "border-primary bg-primary text-primary-foreground" : ""}`}>
            {o.label} · {brl(o.price)}
          </button>
        ))}
      </div>
      <button
        onClick={() => { addCustom(product, options[opt]!); toast.success("Passagem adicionada ao carrinho"); }}
        className="mt-4 w-full rounded-full bg-highlight py-3 font-bold text-highlight-foreground"
      >
        Adicionar · {brl(options[opt]!.price)}
      </button>
    </div>
  );
}

function Passagens() {
  const [mode, setMode] = useState<Mode>("aviao");
  const [fromA, setFromA] = useState("");
  const [toA, setToA] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [fromC, setFromC] = useState<City | null>(null);
  const [toC, setToC] = useState<City | null>(null);
  useEffect(() => {
    if (mode === "onibus" && !cities.length) import("@/lib/data/cidades.json").then((m) => setCities(m.default as City[]));
  }, [mode, cities.length]);

  const results = mode === "aviao"
    ? fromA && toA ? searchFlights(fromA, toA) : null
    : fromC && toC ? searchBuses(fromC, toC, cities) : null;
  const fromName = mode === "aviao" ? findAirport(fromA)?.city + ` (${fromA})` : fromC ? cityLabel(fromC) : "";
  const toName = mode === "aviao" ? findAirport(toA)?.city + ` (${toA})` : toC ? cityLabel(toC) : "";

  const airportSelect = (label: string, v: string, set: (s: string) => void) => (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <select value={v} onChange={(e) => set(e.target.value)} className="mt-1 w-full rounded-2xl border bg-background px-4 py-3 font-medium">
        <option value="">Escolha o aeroporto</option>
        {sortedAirports.map((a) => <option key={a.iata} value={a.iata}>{a.city} - {a.uf} · {a.name} ({a.iata})</option>)}
      </select>
    </label>
  );

  return (
    <CatalogPage kind="passagem" title="Passagens" subtitle="Voos para os principais aeroportos do Brasil e ônibus para qualquer cidade." filter={(p) => p.mode === mode}>
      <div className="mt-6 rounded-3xl bg-card p-4 shadow-card md:p-6">
        <div className="grid grid-cols-2 gap-1 rounded-full bg-muted p-1 md:inline-grid">
          {([["aviao", "Avião", Plane], ["onibus", "Ônibus", Bus]] as const).map(([m, label, Icon]) => (
            <button key={m} onClick={() => setMode(m)} className={`flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid items-end gap-3 md:grid-cols-[1fr_auto_1fr]">
          {mode === "aviao" ? airportSelect("Saindo de", fromA, setFromA) : <CityInput label="Saindo de" cities={cities} value={fromC} onChange={setFromC} />}
          <button
            onClick={() => (mode === "aviao" ? (setFromA(toA), setToA(fromA)) : (setFromC(toC), setToC(fromC)))}
            className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-highlight text-highlight-foreground"
            aria-label="Inverter origem e destino"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          {mode === "aviao" ? airportSelect("Indo para", toA, setToA) : <CityInput label="Indo para" cities={cities} value={toC} onChange={setToC} />}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {mode === "aviao" ? `${airports.length} aeroportos no Brasil, incluindo Viracopos (Campinas).` : `Todas as ${cities.length || "5.570"} cidades do Brasil.`} Preços e horários ilustrativos.
        </p>
      </div>

      {results && (
        <section className="mt-6">
          <h2 className="font-display text-2xl font-bold">Opções encontradas</h2>
          {results.length === 0 ? (
            <p className="mt-3 rounded-3xl bg-muted p-6 text-muted-foreground">Escolha uma origem e um destino diferentes.</p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {results.map((r) => <ResultCard key={r.id} r={r} from={fromName} to={toName} mode={mode} />)}
            </div>
          )}
        </section>
      )}
      <h2 className="mt-10 font-display text-2xl font-bold">Ofertas em destaque</h2>
    </CatalogPage>
  );
}
