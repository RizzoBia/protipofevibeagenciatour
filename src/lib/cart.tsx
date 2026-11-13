import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./catalog";

type Line = { key: string; id: string; option?: string | undefined; price: number; qty: number; custom?: Product };
interface Cart {
  lines: (Line & { product: Product })[];
  add: (id: string, option?: { label: string; price: number }) => void;
  /** Para itens montados na busca (ex.: passagens de qualquer cidade). */
  addCustom: (product: Product, option: { label: string; price: number }) => void;
  setQty: (key: string, qty: number) => void;
  count: number;
  total: number;
}

const Ctx = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    try {
      const s = localStorage.getItem("cart2");
      if (s) setLines(JSON.parse(s));
    } catch {}
  }, []);
  const save = (l: Line[]) => {
    setLines(l);
    localStorage.setItem("cart2", JSON.stringify(l));
  };
  const add: Cart["add"] = (id, option) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    const key = `${id}|${option?.label ?? ""}`;
    const ex = lines.find((l) => l.key === key);
    save(
      ex
        ? lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
        : [...lines, { key, id, option: option?.label, price: option?.price ?? p.price, qty: 1 }],
    );
  };
  const addCustom: Cart["addCustom"] = (product, option) => {
    const key = `${product.id}|${option.label}`;
    const ex = lines.find((l) => l.key === key);
    save(ex ? lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)) : [...lines, { key, id: product.id, option: option.label, price: option.price, qty: 1, custom: product }]);
  };
  const setQty = (key: string, qty: number) =>
    save(qty <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, qty } : l)));
  const full = lines
    .map((l) => ({ ...l, product: (products.find((p) => p.id === l.id) ?? l.custom)! }))
    .filter((l) => l.product);
  return (
    <Ctx.Provider
      value={{
        lines: full,
        add,
        addCustom,
        setQty,
        count: full.reduce((a, l) => a + l.qty, 0),
        total: full.reduce((a, l) => a + l.qty * l.price, 0),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
