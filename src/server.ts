import express from "express";
import http from "http";
import { createWebSocketServer } from "./wsServer";
import { publishRouter } from "./publishHandler";

const app = express();
app.get("/health", (_, res) => res.json({ ok: true, ts: Date.now() }));
app.use("/publish", publishRouter);

const server = http.createServer(app);
createWebSocketServer(server);

const PORT = Number(process.env.PORT || 4000);
server.listen(PORT, () => console.log("listening on", PORT));

process.on("SIGINT", () => process.exit(0));
