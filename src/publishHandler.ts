import express from "express";
import { createRedisClients } from "./redisClient";
import { requireApiKey } from "./auth";
import { PublishMessage } from "./types";

const router = express.Router();
const { pub } = createRedisClients();

router.use(requireApiKey);

router.post("/", express.json(), async (req, res) => {
  const body: PublishMessage = req.body;
  if (!body?.topic || typeof body.topic !== "string") {
    return res.status(400).json({ error: "topic required" });
  }
  await pub.publish(body.topic, JSON.stringify(body.payload || {}));
  return res.json({ ok: true });
});

export { router as publishRouter };

