import { describe, expect, it } from "vitest";
import { travelersNeeded } from "@/lib/travelers";
import { isValidCpf } from "@/lib/br-validation";

describe("viajantes", () => {
  it("2 pacotes completos pedem dados de 2 pessoas", () => {
    expect(travelersNeeded([{ qty: 2 }, { qty: 1 }])).toBe(2);
  });
  it("valida CPF", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
    expect(isValidCpf("111.111.111-11")).toBe(false);
  });
});
