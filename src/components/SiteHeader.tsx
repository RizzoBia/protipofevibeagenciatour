import { Link } from "@tanstack/react-router";
import { BedDouble, Ticket, Sparkles, Plane, ShoppingBag, Home } from "lucide-react";
import { UserRound } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/destaque-turismo-logo.png.asset.json";

const nav = [
  { to: "/hoteis", label: "Hotéis", icon: BedDouble },
  { to: "/ingressos", label: "Ingressos", icon: Ticket },
  { to: "/combos", label: "Combos", icon: Sparkles },
  { to: "/passagens", label: "Passagens", icon: Plane },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const { user, profile } = useAuth();
  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2" aria-label="Destaque Turismo - início">
            <img src={logo.url} alt="Destaque Turismo" className="h-12 w-12 rounded-full shadow-card" />
            <span className="hidden font-display text-lg font-bold leading-none tracking-tight text-primary sm:block">Destaque<br /><span className="text-xs tracking-[0.3em] text-secondary">TURISMO</span></span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-full bg-muted p-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
                activeProps={{ className: "!bg-primary !text-primary-foreground shadow-card" }}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
          {user ? (
            <Link to="/conta" search={{ redirect: undefined }} className="flex h-11 items-center gap-2 rounded-full bg-muted px-4 text-sm font-semibold" aria-label="Minha conta">
              <UserRound className="h-5 w-5" /><span className="hidden sm:inline">{profile?.full_name?.split(" ")[0] ?? "Minha conta"}</span>
            </Link>
          ) : (
            <Link to="/auth" search={{ redirect: undefined }} className="flex h-11 items-center gap-2 rounded-full bg-muted px-4 text-sm font-semibold">
              <UserRound className="h-5 w-5" />Entrar
            </Link>
          )}
          <Link to="/carrinho" className="relative grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground" aria-label="Carrinho">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-highlight px-1 text-xs font-bold text-highlight-foreground">{count}</span>
            )}
          </Link>
          </div>
        </div>
      </header>
      {/* Barra inferior no celular: fácil de alcançar com o polegar */}
      <nav className="fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-full bg-primary px-2 py-2 text-primary-foreground shadow-card md:hidden">
        {[{ to: "/", label: "Início", icon: Home } as const, ...nav].map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            className="flex flex-col items-center gap-0.5 rounded-full px-3 py-1.5 text-[11px] font-medium opacity-70"
            activeProps={{ className: "!opacity-100 bg-highlight text-highlight-foreground" }}
          >
            <n.icon className="h-5 w-5" />
            {n.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
