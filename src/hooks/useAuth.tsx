import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  full_name: string | null;
  cpf: string | null;
  phone: string | null;
  birth_date: string | null;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  profileComplete: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

export const isProfileComplete = (p: Profile | null) =>
  !!(p?.full_name && p.cpf && p.phone && p.birth_date);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (u: User | null) => {
    if (!u) return setProfile(null);
    const { data } = await supabase.from("profiles").select("full_name, cpf, phone, birth_date").eq("id", u.id).maybeSingle();
    setProfile(data ?? null);
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED") return;
      const u = session?.user ?? null;
      setUser(u);
      setTimeout(() => void loadProfile(u).finally(() => setLoading(false)), 0);
    });
    void supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      void loadProfile(data.user).finally(() => setLoading(false));
    });
    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const value: AuthState = {
    user,
    profile,
    loading,
    profileComplete: isProfileComplete(profile),
    refreshProfile: () => loadProfile(user),
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth precisa do AuthProvider");
  return c;
}

/** Só aceita caminhos internos do site para voltar depois do login. */
export const safeRedirect = (r: unknown) =>
  typeof r === "string" && r.startsWith("/") && !r.startsWith("//") ? r : "/";
