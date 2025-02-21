import {prismaClient} from "@repo/db";
import express, { Request,Response } from "express";

export const router:any = express.Router();
interface SignupRequestBody {
    username: String,
    email: String,
    password: String,
    photo?: String
}


router.post("/signin",(req:Request,res:Response)=>{
    
})

router.post("/signup",async (req:Request,res:Response)=>{
    const {username,email,password,photo} = req?.body as SignupRequestBody

    const resp = await prismaClient.User.create({data:{
        username,
        email,
        password,
        photo
    }})

    res.json(resp);
})

