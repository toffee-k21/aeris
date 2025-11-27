// src/ws/wsHeartbeat.ts

export function setupHeartbeat(wss:any, clients:any) {
  setInterval(() => {
    for (const ws of clients) {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    }
  }, 30000);

  wss.on("connection", (ws:any) => {
    ws.isAlive = true;
    ws.on("pong", () => ws.isAlive = true);
  });
}
