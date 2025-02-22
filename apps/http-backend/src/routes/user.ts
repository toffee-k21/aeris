import {prismaClient} from "@repo/db";
import express, { Request,Response } from "express";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config"

export const router:any = express.Router();

router.post("/signin",async (req:Request,res:Response)=>{
    const {email,password} = req?.body;

    const resp = await prismaClient.user.findFirst({
        where:{
           email,
           password
        }
      
    })

    if(!resp){
        return res.json({message: "User does not exists"});
    }

    let token = JWT.sign({userId:resp.id,email:email},JWT_SECRET);

    res.json({token});
})

router.post("/signup",async (req:Request,res:Response)=>{
    const {username,email,password,photo} = req?.body;

    const resp = await prismaClient.user.create({data:{
        username,
        email,
        password,
        photo
    }}); 

    if(!resp){
        res.json({message: "User not added"});
    }

    let token = JWT.sign({userId:resp.id,email:email},JWT_SECRET);

    res.json({token});
})

