// minimal API key auth for publish endpoint
export function requireApiKey(req: any, res: any, next: any) {
  const expected = process.env.API_KEY || "devkey";
  const key = (req.header("x-api-key") || "").toString();
  if (key !== expected) return res.status(401).json({ error: "unauthorized" });
  next();
}

