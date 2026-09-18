import { NextResponse } from "next/server";
import { createSmsText, validateLead } from "@/lib/lead-validation";

export const runtime = "nodejs";
const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => time > now - WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) return true;
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 5000) return NextResponse.json({ error: "Förfrågan är för stor." }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
  }
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "För många försök. Ring oss gärna så hjälper vi dig." }, { status: 429 });
  const validation = validateLead(body);
  if (!validation.ok) return NextResponse.json({ errors: validation.errors }, { status: 422 });

  const username = process.env.ELKS_API_USERNAME;
  const password = process.env.ELKS_API_PASSWORD;
  const to = process.env.LEAD_NOTIFICATION_PHONE;
  if (!username || !password || !to) {
    console.error("Lead notification is not configured");
    return NextResponse.json({ error: "Det gick inte att skicka just nu. Ring oss gärna på 070-403 37 73." }, { status: 503 });
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const credentials = Buffer.from(`${username}:${password}`).toString("base64");
    const result = await fetch("https://api.46elks.com/a1/sms", {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ from: "FasadKungen", to, message: createSmsText(validation.data) }),
      signal: controller.signal,
      cache: "no-store"
    });
    if (!result.ok) {
      console.error("Lead notification provider failed", { status: result.status });
      return NextResponse.json({ error: "Det gick inte att skicka just nu. Ring oss gärna på 070-403 37 73." }, { status: 502 });
    }
  } catch (error) {
    console.error("Lead notification request failed", { name: error instanceof Error ? error.name : "unknown" });
    return NextResponse.json({ error: "Det gick inte att skicka just nu. Ring oss gärna på 070-403 37 73." }, { status: 502 });
  } finally { clearTimeout(timeout); }
  return NextResponse.json({ ok: true, message: "Tack! Vi har fått din förfrågan och återkommer så snart vi kan." });
}
