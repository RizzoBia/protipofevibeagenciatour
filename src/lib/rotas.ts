import type { Cabin } from "./catalog";

export interface Airport { iata: string; city: string; uf: string; name: string; lat: number; lon: number; hub?: boolean }

/** Aeroportos com voos comerciais regulares no Brasil. hub = grande centro de conexões. */
export const airports: Airport[] = [
  { iata: "GRU", city: "São Paulo", uf: "SP", name: "Guarulhos", lat: -23.435, lon: -46.473, hub: true },
  { iata: "CGH", city: "São Paulo", uf: "SP", name: "Congonhas", lat: -23.626, lon: -46.656, hub: true },
  { iata: "VCP", city: "Campinas", uf: "SP", name: "Viracopos", lat: -23.007, lon: -47.134, hub: true },
  { iata: "GIG", city: "Rio de Janeiro", uf: "RJ", name: "Galeão", lat: -22.81, lon: -43.25, hub: true },
  { iata: "SDU", city: "Rio de Janeiro", uf: "RJ", name: "Santos Dumont", lat: -22.91, lon: -43.163, hub: true },
  { iata: "BSB", city: "Brasília", uf: "DF", name: "Presidente Juscelino Kubitschek", lat: -15.869, lon: -47.917, hub: true },
  { iata: "CNF", city: "Belo Horizonte", uf: "MG", name: "Confins", lat: -19.624, lon: -43.972, hub: true },
  { iata: "PLU", city: "Belo Horizonte", uf: "MG", name: "Pampulha", lat: -19.852, lon: -43.95 },
  { iata: "REC", city: "Recife", uf: "PE", name: "Guararapes", lat: -8.126, lon: -34.923, hub: true },
  { iata: "SSA", city: "Salvador", uf: "BA", name: "Dep. Luís Eduardo Magalhães", lat: -12.911, lon: -38.331, hub: true },
  { iata: "FOR", city: "Fortaleza", uf: "CE", name: "Pinto Martins", lat: -3.776, lon: -38.533, hub: true },
  { iata: "POA", city: "Porto Alegre", uf: "RS", name: "Salgado Filho", lat: -29.994, lon: -51.171, hub: true },
  { iata: "CWB", city: "Curitiba", uf: "PR", name: "Afonso Pena", lat: -25.528, lon: -49.176, hub: true },
  { iata: "BEL", city: "Belém", uf: "PA", name: "Val-de-Cans", lat: -1.379, lon: -48.476 },
  { iata: "MAO", city: "Manaus", uf: "AM", name: "Eduardo Gomes", lat: -3.039, lon: -60.05 },
  { iata: "FLN", city: "Florianópolis", uf: "SC", name: "Hercílio Luz", lat: -27.67, lon: -48.552 },
  { iata: "NAT", city: "Natal", uf: "RN", name: "São Gonçalo do Amarante", lat: -5.769, lon: -35.376 },
  { iata: "MCZ", city: "Maceió", uf: "AL", name: "Zumbi dos Palmares", lat: -9.511, lon: -35.792 },
  { iata: "JPA", city: "João Pessoa", uf: "PB", name: "Castro Pinto", lat: -7.146, lon: -34.95 },
  { iata: "AJU", city: "Aracaju", uf: "SE", name: "Santa Maria", lat: -10.984, lon: -37.07 },
  { iata: "SLZ", city: "São Luís", uf: "MA", name: "Marechal Cunha Machado", lat: -2.585, lon: -44.234 },
  { iata: "THE", city: "Teresina", uf: "PI", name: "Senador Petrônio Portella", lat: -5.06, lon: -42.824 },
  { iata: "GYN", city: "Goiânia", uf: "GO", name: "Santa Genoveva", lat: -16.632, lon: -49.221 },
  { iata: "CGB", city: "Cuiabá", uf: "MT", name: "Marechal Rondon", lat: -15.653, lon: -56.117 },
  { iata: "CGR", city: "Campo Grande", uf: "MS", name: "Campo Grande", lat: -20.469, lon: -54.673 },
  { iata: "VIX", city: "Vitória", uf: "ES", name: "Eurico de Aguiar Salles", lat: -20.258, lon: -40.286 },
  { iata: "PMW", city: "Palmas", uf: "TO", name: "Brigadeiro Lysias Rodrigues", lat: -10.291, lon: -48.357 },
  { iata: "PVH", city: "Porto Velho", uf: "RO", name: "Gov. Jorge Teixeira", lat: -8.709, lon: -63.902 },
  { iata: "RBR", city: "Rio Branco", uf: "AC", name: "Plácido de Castro", lat: -9.869, lon: -67.894 },
  { iata: "BVB", city: "Boa Vista", uf: "RR", name: "Atlas Brasil Cantanhede", lat: 2.846, lon: -60.69 },
  { iata: "MCP", city: "Macapá", uf: "AP", name: "Alberto Alcolumbre", lat: 0.051, lon: -51.072 },
  { iata: "IGU", city: "Foz do Iguaçu", uf: "PR", name: "Cataratas", lat: -25.6, lon: -54.485 },
  { iata: "NVT", city: "Navegantes", uf: "SC", name: "Ministro Victor Konder", lat: -26.88, lon: -48.651 },
  { iata: "JOI", city: "Joinville", uf: "SC", name: "Lauro Carneiro de Loyola", lat: -26.224, lon: -48.797 },
  { iata: "LDB", city: "Londrina", uf: "PR", name: "Gov. José Richa", lat: -23.334, lon: -51.13 },
  { iata: "MGF", city: "Maringá", uf: "PR", name: "Sílvio Name Júnior", lat: -23.48, lon: -52.012 },
  { iata: "RAO", city: "Ribeirão Preto", uf: "SP", name: "Leite Lopes", lat: -21.136, lon: -47.777 },
  { iata: "SJP", city: "São José do Rio Preto", uf: "SP", name: "Prof. Eribelto Manoel Reino", lat: -20.817, lon: -49.406 },
  { iata: "UDI", city: "Uberlândia", uf: "MG", name: "Ten. Cel. Aviador César Bombonato", lat: -18.884, lon: -48.225 },
  { iata: "MOC", city: "Montes Claros", uf: "MG", name: "Mário Ribeiro", lat: -16.707, lon: -43.819 },
  { iata: "IOS", city: "Ilhéus", uf: "BA", name: "Jorge Amado", lat: -14.816, lon: -39.033 },
  { iata: "BPS", city: "Porto Seguro", uf: "BA", name: "Porto Seguro", lat: -16.439, lon: -39.081 },
  { iata: "VDC", city: "Vitória da Conquista", uf: "BA", name: "Glauber Rocha", lat: -14.907, lon: -40.915 },
  { iata: "JDO", city: "Juazeiro do Norte", uf: "CE", name: "Orlando Bezerra de Menezes", lat: -7.219, lon: -39.27 },
  { iata: "JJD", city: "Jijoca de Jericoacoara", uf: "CE", name: "Comandante Ariston Pessoa", lat: -2.907, lon: -40.358 },
  { iata: "PNZ", city: "Petrolina", uf: "PE", name: "Senador Nilo Coelho", lat: -9.362, lon: -40.569 },
  { iata: "FEN", city: "Fernando de Noronha", uf: "PE", name: "Fernando de Noronha", lat: -3.855, lon: -32.423 },
  { iata: "STM", city: "Santarém", uf: "PA", name: "Maestro Wilson Fonseca", lat: -2.425, lon: -54.786 },
  { iata: "MAB", city: "Marabá", uf: "PA", name: "João Correa da Rocha", lat: -5.369, lon: -49.138 },
  { iata: "IMP", city: "Imperatriz", uf: "MA", name: "Prefeito Renato Moreira", lat: -5.531, lon: -47.46 },
  { iata: "CXJ", city: "Caxias do Sul", uf: "RS", name: "Hugo Cantergiani", lat: -29.197, lon: -51.188 },
  { iata: "CAC", city: "Cascavel", uf: "PR", name: "Coronel Adalberto Mendes da Silva", lat: -25.0, lon: -53.501 },
  { iata: "XAP", city: "Chapecó", uf: "SC", name: "Serafin Enoss Bertaso", lat: -27.134, lon: -52.656 },
  { iata: "SOD", city: "Sorocaba", uf: "SP", name: "Bertram Luiz Leupolz", lat: -23.478, lon: -47.49 },
];

export const findAirport = (iata: string) => airports.find((a) => a.iata === iata);

export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const r = (x: number) => (x * Math.PI) / 180;
  const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lon - a.lon) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

const hours = (h: number) => `${Math.floor(h)}h${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

export interface TripResult {
  id: string;
  direct: boolean;
  via?: string; // cidade da conexão
  duration: string;
  price: number;
  cabins?: Cabin[];
}

/** Voos: sai direto quando um dos aeroportos é um grande centro (hub); senão faz conexão no hub mais no caminho. */
export function searchFlights(fromIata: string, toIata: string): TripResult[] {
  const a = findAirport(fromIata), b = findAirport(toIata);
  if (!a || !b || a.iata === b.iata || a.city === b.city) return [];
  const d = distanceKm(a, b);
  const cabinsFor = (dist: number, bothHubs: boolean): Cabin[] =>
    bothHubs ? (dist > 1800 ? ["economica", "economica-plus", "executiva", "primeira"] : ["economica", "economica-plus", "executiva"]) : ["economica", "economica-plus"];
  const hubs = airports.filter((h) => h.hub && h.city !== a.city && h.city !== b.city);
  const via = hubs.map((h) => ({ h, total: distanceKm(a, h) + distanceKm(h, b) })).sort((x, y) => x.total - y.total)[0]!;
  const connection: TripResult = {
    id: `voo-${a.iata}-${b.iata}-${via.h.iata}`,
    direct: false,
    via: `${via.h.city} (${via.h.iata})`,
    duration: hours(via.total / 750 + 1 + 1.5),
    price: Math.round(120 + via.total * 0.38),
    cabins: cabinsFor(via.total, false),
  };
  if (a.hub || b.hub) {
    const direct: TripResult = { id: `voo-${a.iata}-${b.iata}`, direct: true, duration: hours(d / 750 + 0.5), price: Math.round(150 + d * 0.45), cabins: cabinsFor(d, !!(a.hub && b.hub)) };
    return [direct, { ...connection, price: Math.min(connection.price, Math.round(direct.price * 0.85)) }];
  }
  return [connection];
}

export type City = [name: string, uf: string, lat: number, lon: number, capital: number];
export const cityLabel = (c: City) => `${c[0]} - ${c[1]}`;

/** Ônibus: até 800 km de estrada há linha direta; acima disso, troca de ônibus na capital mais no caminho. */
export function searchBuses(from: City, to: City, all: City[]): TripResult[] {
  if (cityLabel(from) === cityLabel(to)) return [];
  const p = (c: City) => ({ lat: c[2], lon: c[3] });
  const road = (x: City, y: City) => distanceKm(p(x), p(y)) * 1.3;
  const d = road(from, to);
  const id = `bus-${cityLabel(from)}-${cityLabel(to)}`.replace(/\s/g, "_");
  if (d <= 800) return [{ id, direct: true, duration: hours(d / 65 + 0.3), price: Math.round(25 + d * 0.24) }];
  const via = all
    .filter((c) => c[4] === 1 && cityLabel(c) !== cityLabel(from) && cityLabel(c) !== cityLabel(to))
    .map((c) => ({ c, total: road(from, c) + road(c, to) }))
    .sort((x, y) => x.total - y.total)[0]!;
  return [{ id: `${id}-via`, direct: false, via: cityLabel(via.c), duration: hours(via.total / 65 + 1.5), price: Math.round(25 + via.total * 0.22) }];
}
