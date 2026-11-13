import { describe, expect, it } from "vitest";
import { getRooms, products, stayTotal } from "@/lib/catalog";

const hotel = (id: string) => products.find((p) => p.id === id)!;

describe("quartos de hotel", () => {
  it("total = (diária + extra do andar) × noites", () => {
    const std = getRooms(hotel("h-maragogi"))[0]!;
    expect(stayTotal(std, "baixo", 3)).toBe(690 * 3);
    expect(stayTotal(std, "alto", 3)).toBe((690 + 40) * 3);
  });
  it("suíte de luxo só aparece quando o hotel tem", () => {
    expect(getRooms(hotel("h-maragogi")).some((r) => r.luxury)).toBe(true);
    expect(getRooms(hotel("h-copacabana")).some((r) => r.luxury)).toBe(false);
  });
});
