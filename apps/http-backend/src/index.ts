import express from "express";
import {router as userRouter} from "./routes/user"
import { AuthMiddleware } from "./utils/middleware"

const app = express();

app.use(express.json());

// app.use()

app.use("/user",userRouter);

app.listen(8000,()=>{
    console.log("server running on port 8000");
})