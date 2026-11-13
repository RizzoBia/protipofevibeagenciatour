import praia from "@/assets/praia.jpg";
import show from "@/assets/show.jpg";
import rio from "@/assets/rio.jpg";
import estadio from "@/assets/estadio.jpg";
import quartoStandard from "@/assets/quarto-standard.jpg";
import quartoSuperior from "@/assets/quarto-superior.jpg";
import quartoLuxo from "@/assets/quarto-luxo.jpg";

export type Kind = "hotel" | "ingresso" | "combo" | "passagem";
export type Mode = "aviao" | "onibus";

export interface Product {
  id: string;
  kind: Kind;
  title: string;
  place: string;
  detail: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  mode?: Mode;
  from?: string;
  to?: string;
  duration?: string;
}

export const kindInfo: Record<Kind, { label: string; unit: string; to: "/hoteis" | "/ingressos" | "/combos" | "/passagens" }> = {
  hotel: { label: "Hotéis", unit: "por noite", to: "/hoteis" },
  ingresso: { label: "Ingressos", unit: "por pessoa", to: "/ingressos" },
  combo: { label: "Viagem + Ingresso", unit: "por pessoa", to: "/combos" },
  passagem: { label: "Passagens", unit: "por trecho", to: "/passagens" },
};

export const products: Product[] = [
  { id: "h-maragogi", kind: "hotel", title: "Resort Águas de Maragogi", place: "Maragogi, AL", detail: "Pé na areia · piscina · café incluso", price: 690, oldPrice: 820, image: praia, tag: "Nota 9,4" },
  { id: "h-copacabana", kind: "hotel", title: "Hotel Mirante Copacabana", place: "Rio de Janeiro, RJ", detail: "Vista mar · rooftop · café incluso", price: 540, image: rio, tag: "Nota 9,1" },
  { id: "h-noronha", kind: "hotel", title: "Pousada Vento Leste", place: "Fernando de Noronha, PE", detail: "Bangalôs · trilhas · café incluso", price: 1290, image: praia, tag: "Nota 9,7" },
  { id: "i-festival", kind: "ingresso", title: "Festival Verão Sonoro", place: "São Paulo · 14 dez", detail: "Pista · 2 dias de festival", price: 480, image: show, tag: "Últimos lotes" },
  { id: "i-classico", kind: "ingresso", title: "Clássico no Maracanã", place: "Rio de Janeiro · 22 nov", detail: "Arquibancada leste", price: 180, image: estadio },
  { id: "i-reveillon", kind: "ingresso", title: "Réveillon na Praia", place: "Salvador · 31 dez", detail: "Open bar + 3 palcos", price: 650, image: show },
  { id: "c-rio-classico", kind: "combo", title: "Rio + Clássico no Maracanã", place: "Rio de Janeiro · 21–24 nov", detail: "Hotel 3 noites + ingresso do jogo", price: 2190, oldPrice: 2470, image: estadio, tag: "Economize 11%" },
  { id: "c-festival", kind: "combo", title: "Verão Sonoro Experience", place: "São Paulo · 13–15 dez", detail: "Hotel + 2 dias de festival + transfer", price: 1790, oldPrice: 2080, image: show, tag: "Economize 14%" },
  { id: "c-reveillon", kind: "combo", title: "Réveillon em Salvador", place: "Bahia · 29 dez–2 jan", detail: "Hotel 4 noites + ingresso open bar", price: 3990, oldPrice: 4590, image: praia, tag: "Economize 13%" },
  { id: "v-sp-rio", kind: "passagem", mode: "aviao", title: "São Paulo → Rio de Janeiro", from: "São Paulo", to: "Rio de Janeiro", place: "GRU → GIG", detail: "Voo direto · bagagem de mão", duration: "1h05", price: 289, image: rio },
  { id: "v-sp-mcz", kind: "passagem", mode: "aviao", title: "São Paulo → Maceió", from: "São Paulo", to: "Maceió", place: "GRU → MCZ", detail: "Voo direto · bagagem de mão", duration: "3h10", price: 649, image: praia },
  { id: "v-rio-ssa", kind: "passagem", mode: "aviao", title: "Rio de Janeiro → Salvador", from: "Rio de Janeiro", to: "Salvador", place: "GIG → SSA", detail: "Voo direto · 1 mala de 23kg", duration: "2h05", price: 529, image: praia },
  { id: "b-sp-rio", kind: "passagem", mode: "onibus", title: "São Paulo → Rio de Janeiro", from: "São Paulo", to: "Rio de Janeiro", place: "Tietê → Novo Rio", detail: "Leito · Wi‑Fi · tomada", duration: "6h", price: 139, image: rio },
  { id: "b-bh-rio", kind: "passagem", mode: "onibus", title: "Belo Horizonte → Rio de Janeiro", from: "Belo Horizonte", to: "Rio de Janeiro", place: "Rodoviária BH → Novo Rio", detail: "Semi-leito · Wi‑Fi", duration: "7h", price: 119, image: estadio },
  { id: "b-rec-mcz", kind: "passagem", mode: "onibus", title: "Recife → Maragogi", from: "Recife", to: "Maragogi", place: "TIP → Maragogi", detail: "Executivo · ar-condicionado", duration: "2h30", price: 69, image: praia },
];

export const gallery = (p: Product) => [p.image, ...[praia, show, rio, estadio].filter((i) => i !== p.image)];

export interface Option {
  label: string;
  price: number;
  includes: string[];
}

export type Cabin = "economica" | "economica-plus" | "executiva" | "primeira";

/** Classes que cada voo tem. Só aparecem as classes que o avião oferece. */
export const flightCabinsById: Record<string, Cabin[]> = {
  "v-sp-rio": ["economica", "economica-plus"],
  "v-sp-mcz": ["economica", "economica-plus", "executiva"],
  "v-rio-ssa": ["economica", "economica-plus", "executiva", "primeira"],
};

export const cabinInfo: Record<Cabin, { label: string; factor: number; includes: string[] }> = {
  economica: { label: "Econômica", factor: 1, includes: ["Bagagem de mão 10kg", "Lanche a bordo"] },
  "economica-plus": { label: "Econômica+", factor: 1.4, includes: ["Bagagem de mão 10kg", "1 mala de 23kg", "Mais espaço para as pernas", "Embarque prioritário"] },
  executiva: { label: "Executiva", factor: 2.8, includes: ["2 malas de 23kg", "Poltrona que reclina bastante", "Refeição completa", "Sala VIP no aeroporto"] },
  primeira: { label: "1ª classe", factor: 4.5, includes: ["3 malas de 32kg", "Poltrona-cama privativa", "Menu do chef", "Sala VIP e embarque exclusivo"] },
};

export function flightCabins(p: Product): Option[] {
  return (flightCabinsById[p.id] ?? ["economica"]).map((c) => ({
    label: cabinInfo[c].label,
    price: Math.round(p.price * cabinInfo[c].factor),
    includes: cabinInfo[c].includes,
  }));
}

export function getOptions(p: Product): Option[] {
  if (p.kind === "ingresso")
    return [
      { label: "Pista", price: p.price, includes: ["Ingresso oficial", "Entrega digital no app"] },
      { label: "Área VIP", price: Math.round(p.price * 1.8), includes: ["Ingresso oficial", "Entrada exclusiva", "Bar e banheiros exclusivos"] },
    ];
  if (p.kind === "combo")
    return [
      { label: "Hotel + ingresso", price: p.price, includes: ["Ingresso oficial do evento", "Hotel com café da manhã", "Transfer até o evento", "Seguro viagem"] },
      { label: "Hotel + ingresso + ônibus", price: p.price + 400, includes: ["Ingresso oficial do evento", "Passagem de ônibus ida e volta (leito)", "Hotel com café da manhã", "Transfer até o evento", "Seguro viagem"] },
      { label: "Hotel + ingresso + avião", price: p.price + 600, includes: ["Ingresso oficial do evento", "Passagem aérea ida e volta (bagagem de mão)", "Hotel com café da manhã", "Transfer até o evento", "Seguro viagem"] },
    ];
  if (p.kind === "passagem")
    return p.mode === "aviao"
      ? flightCabins(p)
      : [
          { label: "Convencional", price: p.price, includes: ["Poltrona reclinável", "Bagagem 30kg"] },
          { label: "Leito", price: p.price + 60, includes: ["Poltrona-cama", "Bagagem 30kg", "Kit manta e travesseiro"] },
        ];
  return [
    { label: "Quarto standard", price: p.price, includes: ["Cama casal ou 2 solteiro", "Café da manhã", "Wi‑Fi"] },
    { label: "Quarto superior", price: Math.round(p.price * 1.35), includes: ["Vista privilegiada", "Café da manhã", "Wi‑Fi", "Late check-out"] },
  ];
}

export interface Room {
  id: string;
  label: string;
  pricePerNight: number;
  image: string;
  available: number; // quartos livres
  includes: string[];
  luxury?: boolean;
}

export type Floor = "baixo" | "alto";
export const floorInfo: Record<Floor, { label: string; hint: string; extra: number }> = {
  baixo: { label: "Andar baixo", hint: "Perto da recepção e da piscina", extra: 0 },
  alto: { label: "Andar alto", hint: "Mais silêncio e vista melhor", extra: 40 },
};

/** Quartos de cada hotel. Suítes de luxo só aparecem quando o hotel tem. */
export function getRooms(p: Product): Room[] {
  const rooms: Room[] = [
    { id: "standard", label: "Quarto Standard", pricePerNight: p.price, image: quartoStandard, available: 6, includes: ["Cama casal ou 2 solteiro", "Café da manhã", "Wi‑Fi"] },
    { id: "superior", label: "Quarto Superior vista mar", pricePerNight: Math.round(p.price * 1.35), image: quartoSuperior, available: 2, includes: ["Varanda com vista", "Café da manhã", "Wi‑Fi", "Late check-out"] },
  ];
  if (p.id !== "h-copacabana")
    rooms.push({ id: "luxo", label: "Suíte de Luxo", pricePerNight: Math.round(p.price * 2.2), image: quartoLuxo, available: 1, luxury: true, includes: ["Vista panorâmica", "Banheira", "Sala de estar", "Café no quarto", "Transfer incluso"] });
  return rooms;
}

export const stayTotal = (room: Room, floor: Floor, nights: number) =>
  (room.pricePerNight + floorInfo[floor].extra) * nights;

export const faq = [
  { q: "O ingresso está incluso no combo?", a: "Sim! Em todos os combos Viagem + Ingresso o ingresso oficial já vem incluso, junto com o hotel." },
  { q: "Posso comprar só a passagem?", a: "Sim. Na aba Passagens você compra avião ou ônibus separadamente." },
  { q: "Posso parcelar?", a: "Sim, em até 10x sem juros no cartão, ou com 10% de desconto no PIX." },
  { q: "Como recebo meus ingressos e bilhetes?", a: "Tudo chega no seu e-mail e fica salvo na sua conta." },
];

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
