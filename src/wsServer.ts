import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { Redis } from "ioredis";
import { createRedisClients } from "./redisClient";
import { safeJSONParse } from "./utils";
import { WSClient } from "./types";

/**
 * Creates WebSocket server and wires Redis subscriptions for scaling.
 * - Each WS worker subscribes/unsubscribes to Redis channels on demand.
 */
export function createWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({ server, path: "/ws" });
  const clients = new Set<WSClient>();
  const topicCount = new Map<string, number>(); // how many local clients subscribe
  const { sub } = createRedisClients();

  // Redis message handler: forward to local WS clients
  sub.on("message", (channel: string, message: string) => {
    const payload = safeJSONParse(message) ?? message;
    const topic = channel;
    for (const ws of clients) {
      if (ws.subscriptions?.has(topic) && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "notification", topic, payload, meta: { ts: Date.now() } }));
      }
    }
  });

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

  wss.on("connection", (wsRaw: WebSocket) => {
    const ws = wsRaw as WSClient;
    ws.subscriptions = new Set();
    clients.add(ws);

    // heartbeat
    ws.isAlive = true;
    ws.on("pong", () => ws.isAlive = true);

    ws.on("message", async (raw) => {
      const msg = safeJSONParse(raw);
      if (!msg || !msg.type) {
        ws.send(JSON.stringify({ type: "error", reason: "bad_message" }));
        return;
      }
      if (msg.type === "subscribe" && typeof msg.topic === "string") {
        const t = msg.topic;
        if (!ws.subscriptions!.has(t)) {
          ws.subscriptions!.add(t);
          await ensureSubscribed(t);
          ws.send(JSON.stringify({ type: "subscribed", topic: t }));
        }
      } else if (msg.type === "unsubscribe" && typeof msg.topic === "string") {
        const t = msg.topic;
        if (ws.subscriptions!.has(t)) {
          ws.subscriptions!.delete(t);
          await maybeUnsubscribe(t);
          ws.send(JSON.stringify({ type: "unsubscribed", topic: t }));
        }
      } else {
        ws.send(JSON.stringify({ type: "error", reason: "unknown_type" }));
      }
    });

    ws.on("close", async () => {
      // cleanup counts
      for (const t of ws.subscriptions || []) {
        await maybeUnsubscribe(t);
      }
      clients.delete(ws);
    });
  });

  // Ping/pong to detect dead connections
  const interval = setInterval(() => {
    for (const ws of Array.from(clients)) {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping(() => {});
    }
  }, 30000);

  wss.on("close", () => clearInterval(interval));
}