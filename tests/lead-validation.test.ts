import assert from "node:assert/strict";
import test from "node:test";
import { createSmsText, validateLead } from "../lib/lead-validation";

const valid = { name: "  Anna Andersson ", phone: "+46 70 123 45 67", email: "anna@example.se", area: "Uppsala", service: "Sanering", description: "Behöver hjälp med en betongyta under nästa vecka." };

test("accepts and normalizes a valid lead", () => {
  const result = validateLead(valid);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.name, "Anna Andersson");
});
test("rejects incomplete and invalid values", () => {
  const result = validateLead({ ...valid, phone: "abc", service: "Påhittad", description: "kort" });
  assert.equal(result.ok, false);
  if (!result.ok) { assert.ok(result.errors.phone); assert.ok(result.errors.service); assert.ok(result.errors.description); }
});
test("creates a concise SMS that retains contact data and truncates description", () => {
  const result = validateLead({ ...valid, description: "a".repeat(1200) });
  assert.equal(result.ok, true);
  if (result.ok) { const sms = createSmsText(result.data); assert.match(sms, /Anna Andersson/); assert.match(sms, /\+46 70 123 45 67/); assert.match(sms, /Uppsala \| Sanering/); assert.match(sms, /…$/); assert.ok(sms.length <= 420); }
});
