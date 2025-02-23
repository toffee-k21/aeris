import { prismaClient } from "@repo/db";
import express, {Request, Response} from "express";

export const router:any = express.Router();

router.get("/:roomId", async (req:Request, res:Response)=>{
      const resp = await prismaClient.chat.findMany({
        where:{
            roomId:Number(req.params.roomId)
        },
        take:50,
        orderBy:{
            id: "desc"
        }
      })

      res.json({resp});
})