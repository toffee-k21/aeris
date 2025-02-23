import express from "express";
import {router as userRouter} from "./routes/user"
import {router as roomRouter} from "./routes/room"
import { AuthMiddleware } from "./utils/authMiddleware"

const app = express();

app.use(express.json());

app.use("/user",userRouter);
app.use("/room",AuthMiddleware,roomRouter);

app.listen(8000,()=>{
    console.log("server running on port 8000");
})