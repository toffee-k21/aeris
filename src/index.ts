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

  createWSServer(5000); // WS server
  app.listen(4000, () => console.log("HTTP API on 4000"));
}

start();
