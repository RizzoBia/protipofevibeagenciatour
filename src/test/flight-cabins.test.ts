import { describe, expect, it } from "vitest";
import { getOptions, products } from "@/lib/catalog";

const opts = (id: string) => getOptions(products.find((p) => p.id === id)!).map((o) => o.label);

describe("classes do avião", () => {
  it("voo com todas as classes mostra as 4", () => {
    expect(opts("v-rio-ssa")).toEqual(["Econômica", "Econômica+", "Executiva", "1ª classe"]);
  });
  it("só aparecem as classes que o avião tem", () => {
    expect(opts("v-sp-rio")).toEqual(["Econômica", "Econômica+"]);
  });
});
