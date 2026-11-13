import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { safeRedirect, useAuth } from "@/hooks/useAuth";
import { profileSchema } from "@/lib/br-validation";
import { ProfileFields, emptyProfile, inputCls, type ProfileForm } from "@/components/ProfileFields";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({ redirect: typeof s["redirect"] === "string" ? s["redirect"] : undefined }),
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta | Destaque Turismo" },
      { name: "description", content: "Entre ou crie sua conta na Destaque Turismo para comprar hotéis, ingressos, passagens e combos." },
      { property: "og:title", content: "Entrar ou criar conta | Destaque Turismo" },
      { property: "og:description", content: "Crie sua conta e compre sua viagem com tudo resolvido." },
    ],
  }),
  component: AuthPage,
});

const GoogleLogo = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
);

const credSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(8, "A senha precisa de pelo menos 8 caracteres").max(72),
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const target = safeRedirect(redirect);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prof, setProf] = useState<ProfileForm>(emptyProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const stored = sessionStorage.getItem("auth-redirect");
      sessionStorage.removeItem("auth-redirect");
      void navigate({ to: safeRedirect(stored ?? target), replace: true });
    }
  }, [user, loading, navigate, target]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    const c = credSchema.safeParse({ email, password });
    const pr = mode === "criar" ? profileSchema.safeParse(prof) : null;
    const errs: Record<string, string> = {};
    if (!c.success) c.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
    if (pr && !pr.success) pr.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    if (mode === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg("E-mail ou senha incorretos.");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + target, data: { ...prof, cpf: prof.cpf.replace(/\D/g, ""), phone: prof.phone.replace(/\D/g, "") } },
      });
      if (error) setMsg(error.message.includes("registered") ? "Esse e-mail já tem conta. Tente entrar." : "Não foi possível criar a conta. Tente de novo.");
      else if (!data.session) setMsg("Conta criada! Enviamos um link para o seu e-mail. Clique nele para confirmar e entrar.");
    }
    setBusy(false);
  }

  async function social(provider: "google" | "apple") {
    sessionStorage.setItem("auth-redirect", target);
    const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + "/auth" });
    if (r.error) setMsg("Não foi possível entrar agora. Tente de novo.");
  }

  return (
    <main className="mx-auto max-w-md px-4 pb-28 pt-10">
      <h1 className="font-display text-4xl font-bold tracking-tight">{mode === "entrar" ? "Que bom te ver!" : "Crie sua conta"}</h1>
      <p className="mt-2 text-muted-foreground">{mode === "entrar" ? "Entre para finalizar suas compras." : "Leva menos de um minuto."}</p>

      <div className="mt-6 grid grid-cols-2 rounded-full bg-muted p-1">
        {(["entrar", "criar"] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); setMsg(null); setErrors({}); }} className={`rounded-full py-2 text-sm font-bold ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            {m === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <button type="button" onClick={() => social("google")} className="flex h-12 w-full items-center justify-center gap-[10px] rounded-xl border border-[#747775] bg-[#FFFFFF] px-3 text-sm font-medium text-[#1F1F1F]">
          <GoogleLogo /> Continuar com o Google
        </button>
        <button type="button" onClick={() => social("apple")} className="flex h-12 w-full items-center justify-center rounded-xl bg-[#000000] px-3 text-[20px] font-medium text-[#FFFFFF]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
          Continue with Apple
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />ou com e-mail<span className="h-px flex-1 bg-border" /></div>

      <form onSubmit={submit} className="space-y-4" noValidate>
        {mode === "criar" && <ProfileFields v={prof} set={setProf} errors={errors} />}
        <label className="block text-sm font-semibold">E-mail
          <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          {errors["email"] && <span className="text-xs font-semibold text-destructive">{errors["email"]}</span>}
        </label>
        <label className="block text-sm font-semibold">Senha
          <input type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "entrar" ? "current-password" : "new-password"} />
          {errors["password"] && <span className="text-xs font-semibold text-destructive">{errors["password"]}</span>}
        </label>
        {msg && <p className="rounded-xl bg-muted p-3 text-sm font-semibold">{msg}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-highlight py-3 font-bold text-highlight-foreground disabled:opacity-60">
          {busy ? "Aguarde..." : mode === "entrar" ? "Entrar" : "Criar minha conta"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">Prefere só olhar? <Link to="/" className="font-bold text-primary">Continuar navegando</Link></p>
    </main>
  );
}
