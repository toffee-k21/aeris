import WebSocket, { WebSocketServer } from "ws";
import { sub } from "../config/redis";
import { safeJSONParse } from "../utils/safeJson";
import { toInternalTopic } from "../core/topicManager";
import { setupHeartbeat } from "../services/wsHearbeat";
import { WSClient } from "../types";
import { ApiKey } from "../core/apiKeyManager";

  const clients = new Set<WSClient>();
  const topicCount = new Map<string, number>();

  // subscribe/unsubscribe helpers
  async function ensureSubscribed(topic: string) {
    const count = topicCount.get(topic) || 0;
    if (count === 0) await sub.subscribe(topic);
    topicCount.set(topic, count + 1);
  }
  async function maybeUnsubscribe(topic: string) {
    const count = (topicCount.get(topic) || 0) - 1;
    if (count <= 0) {
      topicCount.delete(topic);
      await sub.unsubscribe(topic);
    } else {
      topicCount.set(topic, count);
    }
  }

export function createWSServer(serverPort:any) {
  const wss = new WebSocketServer({ port: serverPort });

  wss.on("connection", async (rawWs: WebSocket, req) => {
    const ws = rawWs as WSClient;
    const url = new URL(req.url!, "http://localhost");
  const apiKey = url.searchParams.get("apiKey");

  if (!apiKey) {
    ws.close();
    return;
  }

  // validate api key 
  const record = await ApiKey.findOne({ apiKey });
  if (!record) {
    ws.close();
    return;
  }

  ws.appId = record.appId;

    ws.subscriptions = new Set();
    clients.add(ws);

    ws.on("message", (raw) => {
      const msg = safeJSONParse(raw);
      if (msg.type === "subscribe") {
        const internal = toInternalTopic(ws.appId, msg.topic);
        ws.subscriptions!.add(internal);
        ensureSubscribed(internal);
      } 
      else if (msg.type === "unsubscribe" && typeof msg.topic === "string") {
        const t = msg.topic;
        if (ws.subscriptions!.has(t)) {
          ws.subscriptions!.delete(t);
            maybeUnsubscribe(t);
          ws.send(JSON.stringify({ type: "unsubscribed", topic: t }));
        }
      } else {
        ws.send(JSON.stringify({ type: "error", reason: "unknown_type" }));
      }
    });

    ws.on("close", () => {
      for (const topic of ws.subscriptions!) {
        maybeUnsubscribe(topic);
      }
      clients.delete(ws);
    });
  });

  sub.on("message", (topic:any, message:any) => {
    for (const ws of clients) {
      if (ws.subscriptions!.has(topic)) {
        ws.send(message);
      }
    }
  });

  setupHeartbeat(wss, clients);
}
