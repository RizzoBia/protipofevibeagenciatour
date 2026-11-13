/** Quantas pessoas precisam de dados: a maior quantidade de um mesmo item no carrinho. */
export const travelersNeeded = (lines: { qty: number }[]) =>
  lines.reduce((m, l) => Math.max(m, l.qty), 0);
