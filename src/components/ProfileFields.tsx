import { formatCpf, formatPhone } from "@/lib/br-validation";

export type ProfileForm = { full_name: string; cpf: string; phone: string; birth_date: string };
export const emptyProfile: ProfileForm = { full_name: "", cpf: "", phone: "", birth_date: "" };

export const inputCls = "mt-1 w-full rounded-xl border-2 bg-background px-4 py-3 outline-none focus:border-primary";

export function ProfileFields({ v, set, errors }: { v: ProfileForm; set: (v: ProfileForm) => void; errors: Partial<Record<keyof ProfileForm, string>> }) {
  const err = (k: keyof ProfileForm) => errors[k] && <span className="text-xs font-semibold text-destructive">{errors[k]}</span>;
  return (
    <>
      <label className="block text-sm font-semibold">Nome completo
        <input className={inputCls} value={v.full_name} onChange={(e) => set({ ...v, full_name: e.target.value })} autoComplete="name" />
        {err("full_name")}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">CPF
          <input className={inputCls} inputMode="numeric" placeholder="000.000.000-00" value={v.cpf} onChange={(e) => set({ ...v, cpf: formatCpf(e.target.value) })} />
          {err("cpf")}
        </label>
        <label className="block text-sm font-semibold">Data de nascimento
          <input type="date" className={inputCls} value={v.birth_date} onChange={(e) => set({ ...v, birth_date: e.target.value })} />
          {err("birth_date")}
        </label>
      </div>
      <label className="block text-sm font-semibold">Telefone / WhatsApp
        <input className={inputCls} inputMode="tel" placeholder="(11) 90000-0000" value={v.phone} onChange={(e) => set({ ...v, phone: formatPhone(e.target.value) })} autoComplete="tel" />
        {err("phone")}
      </label>
    </>
  );
}
