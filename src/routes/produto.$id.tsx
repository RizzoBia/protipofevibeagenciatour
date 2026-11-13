import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { brl, faq, floorInfo, gallery, getOptions, getRooms, kindInfo, products, stayTotal, type Floor } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/produto/$id")({
  loader: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} | Destaque Turismo` : "Indisponível | Destaque Turismo" },
      { name: "description", content: loaderData?.detail ?? "" },
      { property: "og:title", content: loaderData?.title ?? "Destaque Turismo" },
      { property: "og:description", content: loaderData?.detail ?? "" },
    ],
  }),
  component: ProductPage,
});


function ProductPage() {
  const p = Route.useLoaderData();
  const opts = getOptions(p);
  const [sel, setSel] = useState(p.kind === "passagem" ? 0 : opts.length - 1);
  const [open, setOpen] = useState<number | null>(0);
  const { add } = useCart();
  const imgs = gallery(p);
  const o = opts[sel] ?? opts[0]!;
  const isHotel = p.kind === "hotel";
  const rooms = isHotel ? getRooms(p) : [];
  const [roomId, setRoomId] = useState(rooms[0]?.id ?? "");
  const [nights, setNights] = useState(3);
  const [floor, setFloor] = useState<Floor>("baixo");
  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];
  const total = room ? stayTotal(room, floor, nights) : o.price;
  const buyLabel = room ? `${room.label} · ${floorInfo[floor].label} · ${nights} ${nights === 1 ? "noite" : "noites"}` : o.label;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6">
      <nav className="text-sm text-muted-foreground">
        <Link to="/">Início</Link> | <Link to={kindInfo[p.kind].to}>{kindInfo[p.kind].label}</Link> | <span className="text-primary">{p.title}</span>
      </nav>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">{p.title}</h1>

      <div className="mt-5 grid gap-3 md:grid-cols-4 md:grid-rows-2">
        <img src={imgs[0]} alt={p.title} className="h-64 w-full rounded-xl object-cover md:col-span-2 md:row-span-2 md:h-full" />
        {imgs.slice(1, 5).map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" className="hidden h-44 w-full rounded-xl object-cover md:block" />
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>📅 {p.place}</span>
            <span>🧳 {p.detail}</span>
          </div>
          <div className="mt-5 flex items-center gap-4 rounded-xl border bg-card p-4">
            <div className="font-display text-lg font-bold">Destaque Turismo</div>
            <div>
              <div className="font-semibold text-primary">Agência com tudo incluso</div>
              <div className="text-sm text-muted-foreground">Ingresso oficial, hotel, transfer e seguro, com equipe brasileira no destino.</div>
            </div>
          </div>
          <span className="mt-4 inline-block rounded bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">10% de desconto no PIX</span>

          <p className="mt-6 leading-relaxed">
            Viva {p.title} com tudo resolvido: {o.includes.join(", ").toLowerCase()} e suporte total da nossa equipe. Você foca na diversão. A gente cuida do resto.
          </p>

          {isHotel ? (
            <>
              <h2 className="mt-10 font-display text-2xl font-bold">Escolha seu quarto</h2>
              <p className="mt-1 text-muted-foreground">Veja as fotos, a disponibilidade e o preço de cada quarto.</p>
              <div className="mt-4 space-y-4">
                {rooms.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRoomId(r.id)}
                    className={`grid w-full overflow-hidden rounded-2xl bg-card text-left shadow-card transition sm:grid-cols-[220px_1fr] ${r.id === room?.id ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="relative">
                      <img src={r.image} alt={r.label} loading="lazy" width={1024} height={768} className="h-48 w-full object-cover sm:h-full" />
                      {r.luxury && <span className="absolute left-3 top-3 rounded-full bg-highlight px-3 py-1 text-xs font-bold text-highlight-foreground">✨ Luxo</span>}
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="font-display text-lg font-bold text-primary">{r.label}</div>
                        <div className="text-right">
                          <div className="font-display text-xl font-bold">{brl(r.pricePerNight)}</div>
                          <div className="text-xs text-muted-foreground">por noite</div>
                        </div>
                      </div>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {r.includes.map((i) => <li key={i}>✓ {i}</li>)}
                      </ul>
                      <div className={`mt-3 text-sm font-semibold ${r.available <= 2 ? "text-highlight-strong" : "text-muted-foreground"}`}>
                        {r.available === 1 ? "Só 1 quarto disponível!" : `${r.available} quartos disponíveis`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
          <>
          <h2 className="mt-10 font-display text-2xl font-bold">Escolha sua opção</h2>
          {p.kind === "combo" && <p className="mt-2 text-muted-foreground">Vai precisar de passagem? Escolha se prefere ir de ônibus ou de avião.</p>}
          <div className={`mt-4 grid gap-4 sm:grid-cols-2 ${opts.length === 3 ? "xl:grid-cols-3" : ""}`}>
            {opts.map((op) => (
              <div key={op.label} className="rounded-xl bg-card p-5 shadow-card">
                <div className="font-display font-bold text-primary">{op.label}</div>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {op.includes.map((i) => <li key={i}>✓ {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          </>
          )}

          <h2 className="mt-10 font-display text-2xl font-bold">Por que viajar com a Destaque Turismo?</h2>
          <ul className="mt-4 space-y-2">
            {["Ingressos oficiais e autenticados", "Mais de 18.000 viajantes atendidos", "Zero perrengue: logística, conforto e segurança", "Atendimento em português no destino"].map((t) => (
              <li key={t} className="flex gap-2"><span className="text-highlight">★</span>{t}</li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-bold">Perguntas frequentes</h2>
          <div className="mt-4 divide-y rounded-xl bg-card shadow-card">
            {faq.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full justify-between p-4 text-left font-semibold">
                  {f.q}<span>{open === i ? "−" : "+"}</span>
                </button>
                {open === i && <p className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="text-sm text-muted-foreground">Escolha sua opção e garanta seu lugar!</div>
            <div className="mt-1 font-display text-xl font-bold text-primary">{p.title}</div>
            {isHotel && room ? (
              <div className="mt-4 space-y-4">
                <div>
                  <div className="text-sm font-semibold">Quantas noites?</div>
                  <div className="mt-2 flex items-center justify-between rounded-lg border-2 p-2">
                    <button aria-label="Menos noites" onClick={() => setNights((n) => Math.max(1, n - 1))} className="h-9 w-9 rounded-full bg-muted font-bold">−</button>
                    <span className="font-bold">{nights} {nights === 1 ? "noite" : "noites"}</span>
                    <button aria-label="Mais noites" onClick={() => setNights((n) => Math.min(30, n + 1))} className="h-9 w-9 rounded-full bg-muted font-bold">+</button>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Qual andar você prefere?</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(Object.keys(floorInfo) as Floor[]).map((f) => (
                      <button key={f} onClick={() => setFloor(f)} className={`rounded-lg border-2 p-3 text-left text-sm ${f === floor ? "border-primary bg-muted" : "border-border"}`}>
                        <div className="font-semibold">{floorInfo[f].label}</div>
                        <div className="text-xs text-muted-foreground">{floorInfo[f].hint}</div>
                        <div className="mt-1 text-xs font-bold">{floorInfo[f].extra ? `+ ${brl(floorInfo[f].extra)}/noite` : "Sem custo extra"}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-3 text-sm">
                  <div className="font-semibold">{room.label}</div>
                  <div className="text-muted-foreground">{brl(room.pricePerNight + floorInfo[floor].extra)} × {nights} {nights === 1 ? "noite" : "noites"}</div>
                  <div className="mt-1 font-display text-lg font-bold">Total: {brl(total)}</div>
                </div>
              </div>
            ) : (
            <div className="mt-4 space-y-2">
              {opts.map((op, i) => (
                <button
                  key={op.label}
                  onClick={() => setSel(i)}
                  className={`flex w-full items-center justify-between rounded-lg border-2 p-3 text-left text-sm transition ${i === sel ? "border-primary bg-muted" : "border-border"}`}
                >
                  <span className="font-medium">{op.label}</span>
                  <span className="font-bold">{brl(op.price)}</span>
                </button>
              ))}
            </div>
            )}
            <div className="mt-5 font-display text-3xl font-bold text-primary">10x de {brl(total / 10)}</div>
            <div className="text-sm text-muted-foreground">ou {brl(total * 0.9)} no PIX · {isHotel ? "total da estadia" : kindInfo[p.kind].unit}</div>
            <button
              onClick={() => add(p.id, { label: buyLabel, price: total })}
              className="mt-5 w-full rounded-lg bg-highlight py-3 font-bold uppercase text-highlight-foreground"
            >
              Comprar agora
            </button>
            <p className="mt-3 text-xs text-muted-foreground">Pacotes sujeitos a confirmação. Verifique as condições antes da compra.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
