export function safeJSONParse(s: unknown) {
  try { return JSON.parse(String(s)); } catch { return null; }
}