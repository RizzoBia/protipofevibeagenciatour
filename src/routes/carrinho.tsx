import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/lib/cart";
import { brl } from "@/lib/catalog";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Seu carrinho | Destaque Turismo" },
      { name: "description", content: "Revise seus hotéis, ingressos e passagens antes de finalizar." },
      { property: "og:title", content: "Seu carrinho | Destaque Turismo" },
      { property: "og:description", content: "Revise seus hotéis, ingressos e passagens antes de finalizar." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, total } = useCart();
  const { user, profileComplete } = useAuth();
  const navigate = useNavigate();
  // Para pagar, precisa ter conta e dados completos (nome, CPF, telefone, nascimento).
  const checkout = () => {
    if (!user) return void navigate({ to: "/auth", search: { redirect: "/carrinho" } });
    if (!profileComplete) return void navigate({ to: "/conta", search: { redirect: "/carrinho" } });
    void navigate({ to: "/checkout" });
  };
  return (
    <main className="mx-auto max-w-3xl px-4 pb-28 pt-10">
      <h1 className="font-display text-4xl font-bold tracking-tight">Seu carrinho</h1>
      {lines.length === 0 ? (
        <div className="mt-8 rounded-xl bg-card p-8 text-center shadow-card">
          <p className="text-muted-foreground">Seu carrinho está vazio.</p>
          <Link to="/combos" className="mt-4 inline-block rounded-lg bg-highlight px-4 py-2 font-bold text-highlight-foreground">Ver combos</Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-4 rounded-xl bg-card p-3 shadow-card">
                <img src={l.product.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="font-display font-bold leading-tight">{l.product.title}</div>
                  <div className="text-xs text-muted-foreground">{l.option ?? l.product.detail}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => setQty(l.key, l.qty - 1)} className="h-7 w-7 rounded bg-muted font-bold">−</button>
                    <span className="w-6 text-center">{l.qty}</span>
                    <button onClick={() => setQty(l.key, l.qty + 1)} className="h-7 w-7 rounded bg-muted font-bold">+</button>
                  </div>
                </div>
                <div className="font-display font-bold text-primary">{brl(l.price * l.qty)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between rounded-xl bg-primary p-5 text-primary-foreground">
            <div>
              <div className="text-sm opacity-80">Total</div>
              <div className="font-display text-2xl font-bold">{brl(total)}</div>
              <div className="text-xs opacity-80">ou 10x de {brl(total / 10)}</div>
            </div>
            <button onClick={checkout} className="rounded-lg bg-highlight px-5 py-3 font-bold text-highlight-foreground">
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </main>
  );
}
