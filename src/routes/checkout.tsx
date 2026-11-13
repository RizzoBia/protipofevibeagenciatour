import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { BedDouble, Plane, Ticket, UserRound, UserPlus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/useAuth";
import { brl } from "@/lib/catalog";
import { formatCpf, formatPhone, profileSchema } from "@/lib/br-validation";
import { travelersNeeded } from "@/lib/travelers";
import { ProfileFields, emptyProfile, type ProfileForm } from "@/components/ProfileFields";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Dados dos viajantes | Destaque Turismo" },
      { name: "description", content: "Informe os dados de cada viajante para hotel, voo e evento." },
      { property: "og:title", content: "Dados dos viajantes | Destaque Turismo" },
      { property: "og:description", content: "Informe os dados de cada viajante antes de pagar." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, total, setQty } = useCart();
  const resize = (k: number) => lines.forEach((l) => setQty(l.key, Math.max(1, k)));
  const { user, profile, loading, profileComplete } = useAuth();
  const navigate = useNavigate();
  const n = travelersNeeded(lines);
  const [people, setPeople] = useState<ProfileForm[]>([]);
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

  useEffect(() => {
    if (loading) return;
    if (!user) void navigate({ to: "/auth", search: { redirect: "/checkout" }, replace: true });
    else if (!profileComplete) void navigate({ to: "/conta", search: { redirect: "/checkout" }, replace: true });
  }, [loading, user, profileComplete, navigate]);

  useEffect(() => {
    setPeople((prev) => {
      const me: ProfileForm = profile
        ? { full_name: profile.full_name ?? "", cpf: formatCpf(profile.cpf ?? ""), phone: formatPhone(profile.phone ?? ""), birth_date: profile.birth_date ?? "" }
        : emptyProfile;
      return Array.from({ length: n }, (_, i) => prev[i] ?? (i === 0 ? me : emptyProfile));
    });
  }, [n, profile]);

  const has = (k: string) => lines.some((l) => l.product.kind === k);
  const needs = [
    (has("hotel") || has("combo")) && { icon: BedDouble, t: "Hotel" },
    (has("passagem") || lines.some((l) => /avião|ônibus|passagem/i.test(l.option ?? ""))) && { icon: Plane, t: "Passagem" },
    (has("ingresso") || has("combo")) && { icon: Ticket, t: "Ingresso do evento" },
  ].filter(Boolean) as { icon: typeof BedDouble; t: string }[];

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<number, Record<string, string>> = {};
    people.forEach((p, i) => {
      const r = profileSchema.safeParse(p);
      if (!r.success) errs[i] = Object.fromEntries(r.error.issues.map((x) => [String(x.path[0]), x.message]));
    });
    const cpfs = people.map((p) => p.cpf.replace(/\D/g, ""));
    cpfs.forEach((c, i) => { if (c && cpfs.indexOf(c) !== i) errs[i] = { ...errs[i], cpf: "Esse CPF já foi usado para outro viajante" }; });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    alert("Dados salvos! O pagamento ainda não está disponível nesta versão.");
  }

  if (loading || !user) return <main className="mx-auto max-w-3xl px-4 pt-10 text-muted-foreground">Carregando...</main>;
  if (n === 0) return (
    <main className="mx-auto max-w-3xl px-4 pt-10">
      <p className="text-muted-foreground">Seu carrinho está vazio.</p>
      <Link to="/combos" className="mt-4 inline-block font-bold text-primary">Ver combos</Link>
    </main>
  );

  return (
    <main className="mx-auto max-w-3xl px-4 pb-28 pt-10">
      <h1 className="font-display text-4xl font-bold tracking-tight">Quem vai viajar?</h1>
      <p className="mt-2 text-muted-foreground">
        Precisamos dos dados de {n === 1 ? "1 pessoa" : `${n} pessoas`} para emitir:
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {needs.map((x) => (
          <span key={x.t} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-semibold"><x.icon className="h-4 w-4" />{x.t}</span>
        ))}
      </div>

      <form onSubmit={submit} className="mt-8 space-y-6" noValidate>
        {people.map((p, i) => (
          <section key={i} className="rounded-3xl bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><UserRound className="h-5 w-5" /></span>
              <div>
                <div className="font-display text-lg font-bold">Viajante {i + 1}{i === 0 ? " · você" : ""}</div>
                <div className="text-xs text-muted-foreground">{i === 0 ? "Preenchemos com os dados da sua conta" : "Nome igual ao do documento"}</div>
              </div>
              {i > 0 && (
                <button type="button" onClick={() => { setPeople((all) => all.filter((_, j) => j !== i)); resize(n - 1); }} aria-label={`Remover viajante ${i + 1}`} className="ml-auto rounded-full p-2 text-muted-foreground hover:bg-muted"><X className="h-5 w-5" /></button>
              )}
            </div>
            <div className="space-y-4">
              <ProfileFields v={p} errors={errors[i] ?? {}} set={(v) => setPeople((all) => all.map((x, j) => (j === i ? v : x)))} />
            </div>
          </section>
        ))}
        <button type="button" onClick={() => resize(n + 1)} className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-primary/40 p-5 font-bold text-primary hover:bg-muted">
          <UserPlus className="h-5 w-5" /> Comprar também para outra pessoa
        </button>
        <p className="text-center text-xs text-muted-foreground">Cada pessoa adicionada leva mais um de cada item do carrinho (hotel, passagem e ingresso).</p>
        <div className="flex items-center justify-between rounded-2xl bg-primary p-5 text-primary-foreground">
          <div>
            <div className="text-sm opacity-80">Total</div>
            <div className="font-display text-2xl font-bold">{brl(total)}</div>
          </div>
          <button className="rounded-lg bg-highlight px-5 py-3 font-bold text-highlight-foreground">Ir para o pagamento</button>
        </div>
      </form>
    </main>
  );
}
