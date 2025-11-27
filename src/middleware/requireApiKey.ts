// src/middleware/requireApiKey.ts
import { ApiKey } from "../core/apiKeyManager";
import { Request, Response, NextFunction } from "express";

const apiKeyCache = new Map();

export async function requireApiKey(req: any, res : Response, next: NextFunction) {
  const key = req.headers["x-api-key"];
  if (!key) return res.status(401).json({ error: "API key required" });

  if (apiKeyCache.has(key)) {
    req.appId = apiKeyCache.get(key);
    return next();
  }

  const record = await ApiKey.findOne({ apiKey: key });
  if (!record) return res.status(403).json({ error: "Invalid API key" });

  apiKeyCache.set(key, record.appId);
  req.appId = record.appId;

  next();
}
