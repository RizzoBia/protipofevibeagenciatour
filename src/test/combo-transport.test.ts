import { describe, expect, it } from "vitest";
import { getOptions, products } from "@/lib/catalog";

describe("combos com passagem", () => {
  it("todo combo com passagem informa se é ônibus ou avião", () => {
    for (const p of products.filter((x) => x.kind === "combo")) {
      const withTicket = getOptions(p).filter((o) => /passagem|ônibus|avião/i.test(o.label));
      expect(withTicket.map((o) => o.label)).toEqual(["Hotel + ingresso + ônibus", "Hotel + ingresso + avião"]);
    }
  });
});
