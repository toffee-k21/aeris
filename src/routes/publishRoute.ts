import express, { Response } from "express";
import { requireApiKey } from "../middleware/requireApiKey";
import { publishMessage } from "../services/publishService";

const router = express.Router();

router.post("/", requireApiKey, async (req: any, res : Response) => {
  const { topic, payload } = req.body;
  const response = await publishMessage(req.appId, topic, payload);
  res.json(response);
});

export { router as publishRouter };
