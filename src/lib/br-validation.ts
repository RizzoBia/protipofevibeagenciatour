import { z } from "zod";

export function isValidCpf(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  const calc = (len: number) => {
    let s = 0;
    for (let i = 0; i < len; i++) s += Number(d[i]) * (len + 1 - i);
    const r = (s * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === Number(d[9]) && calc(10) === Number(d[10]);
}

export const formatCpf = (v: string) =>
  v.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");

export const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export const profileSchema = z.object({
  full_name: z.string().trim().min(3, "Digite seu nome completo").max(120),
  cpf: z.string().refine(isValidCpf, "CPF inválido"),
  phone: z.string().refine((v) => /^\d{10,11}$/.test(v.replace(/\D/g, "")), "Telefone inválido"),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Informe sua data de nascimento"),
});
