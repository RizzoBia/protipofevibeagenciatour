import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { safeRedirect, useAuth } from "@/hooks/useAuth";
import { formatCpf, formatPhone, profileSchema } from "@/lib/br-validation";
import { ProfileFields, emptyProfile, type ProfileForm } from "@/components/ProfileFields";

export const Route = createFileRoute("/conta")({
  validateSearch: (s: Record<string, unknown>) => ({ redirect: typeof s["redirect"] === "string" ? s["redirect"] : undefined }),
  head: () => ({
    meta: [
      { title: "Minha conta | Destaque Turismo" },
      { name: "description", content: "Seus dados de cadastro na Destaque Turismo." },
      { property: "og:title", content: "Minha conta | Destaque Turismo" },
      { property: "og:description", content: "Seus dados de cadastro na Destaque Turismo." },
    ],
  }),
  component: ContaPage,
});

function ContaPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, profile, loading, profileComplete, refreshProfile, signOut } = useAuth();
  const [v, setV] = useState<ProfileForm>(emptyProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/auth", search: { redirect: "/conta" }, replace: true });
  }, [loading, user, navigate]);
  useEffect(() => {
    if (profile) setV({ full_name: profile.full_name ?? "", cpf: formatCpf(profile.cpf ?? ""), phone: formatPhone(profile.phone ?? ""), birth_date: profile.birth_date ?? "" });
  }, [profile]);

  async function save(e: FormEvent) {
    e.preventDefault();
    const r = profileSchema.safeParse(v);
    const errs: Record<string, string> = {};
    if (!r.success) r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
    setErrors(errs);
    if (!r.success || !user) return;
    const row = { id: user.id, full_name: v.full_name.trim(), cpf: v.cpf.replace(/\D/g, ""), phone: v.phone.replace(/\D/g, ""), birth_date: v.birth_date };
    const { error } = await supabase.from("profiles").upsert(row);
    if (error) return setErrors({ full_name: "Não foi possível salvar. Tente de novo." });
    await refreshProfile();
    setSaved(true);
    if (redirect) void navigate({ to: safeRedirect(redirect) });
  }

  if (loading || !user) return <main className="mx-auto max-w-md px-4 pt-10 text-muted-foreground">Carregando...</main>;

  return (
    <main className="mx-auto max-w-md px-4 pb-28 pt-10">
      <h1 className="font-display text-4xl font-bold tracking-tight">Minha conta</h1>
      <p className="mt-2 text-muted-foreground">{user.email}</p>
      {!profileComplete && <p className="mt-4 rounded-xl bg-highlight/25 p-3 text-sm font-semibold">Complete seus dados para poder finalizar compras.</p>}
      <form onSubmit={save} className="mt-6 space-y-4" noValidate>
        <ProfileFields v={v} set={(n) => { setV(n); setSaved(false); }} errors={errors} />
        {saved && <p className="text-sm font-semibold text-primary">Dados salvos ✓</p>}
        <button className="w-full rounded-xl bg-highlight py-3 font-bold text-highlight-foreground">{redirect ? "Salvar e continuar" : "Salvar dados"}</button>
      </form>
      <div className="mt-6 flex justify-between text-sm">
        <Link to="/carrinho" className="font-bold text-primary">Ir para o carrinho</Link>
        <button onClick={async () => { await signOut(); void navigate({ to: "/", replace: true }); }} className="font-bold text-muted-foreground">Sair da conta</button>
      </div>
    </main>
  );
}
