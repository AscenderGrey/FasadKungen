"use client";

import { FormEvent, useState } from "react";
import { SERVICES } from "@/lib/lead-validation";

const initial = { name: "", phone: "", email: "", area: "", service: "", description: "", website: "" };
type Values = typeof initial;

export function LeadForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const change = (key: keyof Values, value: string) => setValues((old) => ({ ...old, [key]: value }));
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setErrors({}); setMessage("");
    try {
      const result = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const payload = await result.json() as { ok?: boolean; message?: string; error?: string; errors?: Record<string, string> };
      if (!result.ok) { setErrors(payload.errors ?? {}); setMessage(payload.error ?? "Kontrollera uppgifterna och försök igen."); setStatus("error"); return; }
      setStatus("success"); setMessage(payload.message ?? "Tack! Vi har fått din förfrågan och återkommer så snart vi kan."); setValues(initial);
    } catch { setStatus("error"); setMessage("Det gick inte att skicka just nu. Försök igen eller ring oss på 070-403 37 73."); }
  }
  return <form className="lead-form" onSubmit={submit} noValidate>
    <div className="field honeypot" aria-hidden="true"><label htmlFor="website">Webbplats</label><input id="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => change("website", e.target.value)} /></div>
    <div className="form-grid">
      <Field label="Namn" id="name" required value={values.name} error={errors.name} onChange={(v) => change("name", v)} />
      <Field label="Telefonnummer" id="phone" type="tel" required value={values.phone} error={errors.phone} onChange={(v) => change("phone", v)} />
      <Field label="E-post (valfritt)" id="email" type="email" value={values.email} error={errors.email} onChange={(v) => change("email", v)} />
      <Field label="Ort eller område" id="area" required value={values.area} error={errors.area} onChange={(v) => change("area", v)} />
      <div className="field"><label htmlFor="service">Tjänst <span>*</span></label><select id="service" value={values.service} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined} onChange={(e) => change("service", e.target.value)}><option value="">Välj tjänst</option>{SERVICES.map((service) => <option key={service}>{service}</option>)}</select>{errors.service && <p id="service-error" className="field-error">{errors.service}</p>}</div>
    </div>
    <div className="field"><label htmlFor="description">Berätta om arbetet <span>*</span></label><textarea id="description" rows={5} value={values.description} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} onChange={(e) => change("description", e.target.value)} />{errors.description && <p id="description-error" className="field-error">{errors.description}</p>}</div>
    <button className="button button-orange" disabled={status === "sending"}>{status === "sending" ? "Skickar…" : "Be om offert"}</button>
    {message && <p className={`form-message ${status}`} role="status">{message}</p>}
  </form>;
}

function Field({ label, id, value, error, onChange, required, type = "text" }: { label: string; id: keyof Values; value: string; error?: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <div className="field"><label htmlFor={id}>{label} {required && <span>*</span>}</label><input id={id} type={type} inputMode={type === "tel" ? "tel" : type === "email" ? "email" : "text"} autoComplete={id === "name" ? "name" : id === "phone" ? "tel" : id === "email" ? "email" : "address-level2"} value={value} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} onChange={(e) => onChange(e.target.value)} />{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>;
}
