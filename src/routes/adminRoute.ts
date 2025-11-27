import express from "express";
import { generateApiKey } from "../services/genrateApiKey";
import crypto from "crypto";
import { ApiKey } from "../core/apiKeyManager";

const router = express.Router();

router.post("/create-app", async (req, res) => {
  const { appName } = req.body;

  const appId = "app_" + crypto.randomBytes(6).toString("hex");
  const apiKey = generateApiKey();

  await ApiKey.create({
    appId,
    apiKey,
    appName,
  });

  res.json({ appId, apiKey });
});

export { router as adminRouter };