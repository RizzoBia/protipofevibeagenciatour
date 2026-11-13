import { describe, expect, it } from "vitest";
import cidades from "@/lib/data/cidades.json";
import { airports, searchBuses, searchFlights, type City } from "@/lib/rotas";

const all = cidades as City[];
const city = (n: string, uf: string) => all.find((c) => c[0] === n && c[1] === uf)!;

describe("passagens", () => {
  it("Campinas (Viracopos) está entre os aeroportos", () => {
    expect(airports.some((a) => a.iata === "VCP" && a.city === "Campinas")).toBe(true);
  });
  it("ônibus cobre todas as cidades do Brasil", () => {
    expect(all.length).toBeGreaterThan(5500);
  });
  it("voo saindo de grande aeroporto tem opção direta", () => {
    expect(searchFlights("VCP", "REC")[0]!.direct).toBe(true);
  });
  it("voo entre dois aeroportos pequenos tem conexão", () => {
    const r = searchFlights("IOS", "CXJ");
    expect(r).toHaveLength(1);
    expect(r[0]!.direct).toBe(false);
  });
  it("ônibus perto é direto e longe tem conexão", () => {
    expect(searchBuses(city("Campinas", "SP"), city("Santos", "SP"), all)[0]!.direct).toBe(true);
    expect(searchBuses(city("Campinas", "SP"), city("Fortaleza", "CE"), all)[0]!.direct).toBe(false);
  });
});
