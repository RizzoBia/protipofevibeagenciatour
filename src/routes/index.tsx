import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, BedDouble, Ticket, Sparkles, Plane, ShieldCheck, CreditCard, Headphones } from "lucide-react";
import show from "@/assets/show.jpg";
import { kindInfo, products, type Kind } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Destaque Turismo | Viaje. Descubra. Viva." },
      { name: "description", content: "Hotéis, ingressos para eventos, passagens de avião e ônibus e combos viagem + ingresso." },
      { property: "og:title", content: "Destaque Turismo | Viaje. Descubra. Viva." },
      { property: "og:description", content: "Vá ao evento com tudo resolvido: hotel, passagem e ingresso." },
    ],
  }),
  component: Index,
});

const tiles: { kind: Kind; icon: typeof BedDouble; text: string }[] = [
  { kind: "combo", icon: Sparkles, text: "Hotel + ingresso juntos, mais barato" },
  { kind: "ingresso", icon: Ticket, text: "Shows, festivais e jogos" },
  { kind: "hotel", icon: BedDouble, text: "Onde ficar no destino" },
  { kind: "passagem", icon: Plane, text: "Avião e ônibus" },
];

function Row({ kind, title }: { kind: Kind; title: string }) {
  return (
    <section className="mt-14">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        <Link to={kindInfo[kind].to} className="rounded-full bg-muted px-4 py-2 text-sm font-semibold">Ver tudo</Link>
      </div>
      <div className="-mx-4 mt-5 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {products.filter((p) => p.kind === kind).slice(0, 3).map((p) => (
          <div key={p.id} className="w-[78%] shrink-0 snap-start md:w-auto"><ProductCard p={p} /></div>
        ))}
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-6">
      <section className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-block rounded-full bg-highlight px-3 py-1 text-xs font-bold text-highlight-foreground">Novo · Viagem + Ingresso</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            O evento é o destino.
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Ingresso, hotel e passagem no mesmo lugar. Escolha por onde começar:
          </p>
        </div>
        <div className="relative">
          <img src={show} alt="Show lotado" width={1024} height={1024} className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-card" />
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-card p-4 shadow-card md:left-auto md:w-64">
            <div className="text-xs font-semibold text-muted-foreground">Combo mais vendido</div>
            <div className="font-display font-bold">Verão Sonoro Experience</div>
            <Link to="/combos" className="text-sm font-bold text-primary">a partir de R$ 1.790 →</Link>
          </div>
        </div>
      </section>

      <section className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
        {tiles.map((t, i) => (
          <Link
            key={t.kind}
            to={kindInfo[t.kind].to}
            className={`group flex flex-col justify-between rounded-3xl p-5 transition hover:-translate-y-1 ${i === 0 ? "bg-primary text-primary-foreground" : "bg-card shadow-card"}`}
          >
            <span className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 0 ? "bg-highlight text-highlight-foreground" : "bg-muted text-primary"}`}>
              <t.icon className="h-6 w-6" />
            </span>
            <div className="mt-6">
              <div className="font-display text-lg font-bold">{kindInfo[t.kind].label}</div>
              <div className={`text-sm ${i === 0 ? "opacity-80" : "text-muted-foreground"}`}>{t.text}</div>
            </div>
          </Link>
        ))}
      </section>

      <Row kind="combo" title="Viagem + Ingresso" />
      <Row kind="ingresso" title="Próximos eventos" />
      <Row kind="hotel" title="Hotéis bem avaliados" />
      <Row kind="passagem" title="Passagens em promoção" />

      <section className="mt-16 grid gap-4 rounded-[2rem] bg-primary p-8 text-primary-foreground md:grid-cols-3">
        {[[ShieldCheck, "Compra segura", "Ingressos oficiais e garantidos"], [CreditCard, "Até 10x sem juros", "Ou 10% off no PIX"], [Headphones, "Ajuda de verdade", "Atendimento em português"]].map(([I, t, s]) => {
          const Icon = I as typeof ShieldCheck;
          return (
            <div key={t as string} className="flex items-center gap-4">
              <Icon className="h-8 w-8 text-highlight" />
              <div><div className="font-bold">{t as string}</div><div className="text-sm opacity-80">{s as string}</div></div>
            </div>
          );
        })}
      </section>
      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] text-secondary">VIAJE. DESCUBRA. VIVA.</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Toda grande viagem começa com um sonho.</h2>
          <p className="mt-4 text-muted-foreground">Foi acreditando no poder que uma viagem tem de transformar momentos em lembranças que nasceu a Destaque Turismo. Mais do que pacotes, oferecemos tranquilidade, segurança, atendimento próximo e uma experiência personalizada do início ao fim.</p>
          <p className="mt-3 text-muted-foreground">Férias, viagem em família, lua de mel, intercâmbio ou aquele show que você não quer perder: será um prazer fazer parte dessa jornada.</p>
        </div>
        <div className="rounded-[2rem] bg-highlight p-8 text-highlight-foreground">
          <h3 className="font-display text-2xl font-bold">Pare de pagar mais caro na sua viagem</h3>
          <p className="mt-3">Com acesso às melhores tarifas e combinações de serviços, montamos pacotes que custam menos do que comprar tudo separado. E você ainda tem alguém cuidando dos detalhes antes, durante e depois da viagem.</p>
          <a href="https://www.instagram.com/destaque_turismo_/" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground">
            <Instagram className="h-5 w-5" />Fale com a gente no Instagram
          </a>
        </div>
      </section>
      <footer className="mt-10 flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
        <span>© 2026 Destaque Turismo · Viaje. Descubra. Viva. · Preços ilustrativos</span>
        <a href="https://www.instagram.com/destaque_turismo_/" target="_blank" rel="noreferrer" className="font-semibold text-primary">@destaque_turismo_</a>
      </footer>
    </main>
  );
}
