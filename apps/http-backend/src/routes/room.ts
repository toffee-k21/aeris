import { prismaClient } from "@repo/db";
import express, { Request,Response } from "express";

export const router:any = express.Router();

interface RequestExtend extends Request {
userId : string
}

router.post("/",async (req:RequestExtend,res:Response)=>{
    try{
        const resp = await prismaClient.room.create({
            data:{
                slug: req.body.slug,
                adminId : req.userId
            }
        })
        
        res.json({
            roomId : resp.id
        })
    } catch (e){
        res.json({message:"room id not unique"});
    }
})