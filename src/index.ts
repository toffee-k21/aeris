import express from "express";
import { connectDB } from "./config/database";
import { publishRouter } from "./routes/publishRoute";
import { createWSServer } from "./ws/wsServer";
import { adminRouter } from "./routes/adminRoute";

const app = express();
app.use(express.json());

app.use("/publish", publishRouter);
app.use("/admin", adminRouter);

async function start() {
  await connectDB();

  createWSServer(4000); // WS server
  app.listen(5001, () => console.log("HTTP API on 5001"));
}

start();
