export const SERVICES = ["Fasadtvätt", "Blästring", "Sanering", "Intäckning", "Bilning", "Rivning / grovarbete", "Mindre renovering", "Annat"] as const;
export type Service = (typeof SERVICES)[number];
export type ValidLead = { name: string; phone: string; email: string; area: string; service: Service; description: string };
export type ValidationResult = { ok: true; data: ValidLead } | { ok: false; errors: Record<string, string> };

const compact = (value: unknown) => typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
const emailOk = (value: string) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const phoneOk = (value: string) => /^[+()\d][\d\s()+-]{5,24}$/.test(value) && (value.match(/\d/g)?.length ?? 0) >= 6;

export function validateLead(input: Record<string, unknown>): ValidationResult {
  const name = compact(input.name);
  const phone = compact(input.phone);
  const email = compact(input.email);
  const area = compact(input.area);
  const service = compact(input.service);
  const description = compact(input.description);
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Skriv ditt namn.";
  if (name.length > 80) errors.name = "Namnet är för långt.";
  if (!phoneOk(phone)) errors.phone = "Skriv ett telefonnummer vi kan nå dig på.";
  if (phone.length > 32) errors.phone = "Telefonnumret är för långt.";
  if (!emailOk(email)) errors.email = "Skriv en giltig e-postadress.";
  if (email.length > 120) errors.email = "E-postadressen är för lång.";
  if (area.length < 2) errors.area = "Skriv ort eller område.";
  if (area.length > 100) errors.area = "Området är för långt.";
  if (!SERVICES.includes(service as Service)) errors.service = "Välj en tjänst.";
  if (description.length < 10) errors.description = "Berätta kort om arbetet (minst 10 tecken).";
  if (description.length > 1200) errors.description = "Beskrivningen är för lång.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data: { name, phone, email, area, service: service as Service, description } };
}

export function createSmsText(lead: ValidLead) {
  const contact = lead.email ? `${lead.phone}, ${lead.email}` : lead.phone;
  const header = `Ny offertförfrågan FasadKungen\n${lead.name} | ${contact}\n${lead.area} | ${lead.service}\n`;
  const maxDescription = Math.max(0, 420 - header.length);
  const description = lead.description.length > maxDescription ? `${lead.description.slice(0, Math.max(0, maxDescription - 1)).trimEnd()}…` : lead.description;
  return `${header}${description}`;
}
