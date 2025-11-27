// src/core/apiKeyManager.ts
import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  appId: String,
  apiKey: String,
  appName: String,
  createdAt: { type: Date, default: Date.now }
});

export const ApiKey = mongoose.model("ApiKey", apiKeySchema);
