import WebSocket, { WebSocketServer } from "ws";
import { sub } from "../config/redis";
import { safeJSONParse } from "../utils/safeJson";
import { toInternalTopic } from "../core/topicManager";
import { setupHeartbeat } from "../services/wsHearbeat";
import { WSClient } from "../types";

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

  wss.on("connection", (rawWs: WebSocket, req) => {
    const ws = rawWs as WSClient
    ws.subscriptions = new Set();
    clients.add(ws);

    ws.on("message", (raw) => {
      const msg = safeJSONParse(raw);
      if (msg.type === "subscribe") {
        const internal = toInternalTopic(ws.appId, msg.topic);
        ws.subscriptions!.add(internal);
        ensureSubscribed(internal);
      }
    });

    ws.on("close", () => {
      for (const topic of ws.subscriptions!) {
        maybeUnsubscribe(topic);
      }
      clients.delete(ws);
    });
  });

  sub.on("message", (channel:any, message:any) => {
    for (const ws of clients) {
      if (ws.subscriptions!.has(channel)) {
        ws.send(message);
      }
    }
  });

  setupHeartbeat(wss, clients);
}
