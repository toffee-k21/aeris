import express from "express";
import {router as userRouter} from "./routes/user"
import {router as roomRouter} from "./routes/room"
import { AuthMiddleware } from "./utils/authMiddleware"

const app = express();

app.use(express.json());

app.use("/user",userRouter);
app.use("/room",AuthMiddleware,roomRouter);

// eyJhbGciOiJIUzI1NiJ9.dGF1ZmlxQGdtYWlsLmNvbQ.zAQFXXtfuNE7ZcticTd0vG81SFLBYWAhtnUofWpLAhc
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMDU4NDg5NS02NjcyLTRjZjEtYWQzOS1jMDNkYTYyYTM4NGMiLCJlbWFpbCI6InRhdWZpcUBnbWFpbC5jb20iLCJpYXQiOjE3NDAyMzUxODF9.EC61DfLNN1wVpGgVj4rw3nUEeRak_t_CiIXbK-HivKw
app.listen(8000,()=>{
    console.log("server running on port 8000");
})