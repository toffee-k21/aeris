import { JWT_SECRET } from "@repo/common-backend/config";
import { Request, Response, NextFunction } from "express"
import JWT from "jsonwebtoken"

export const AuthMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];

if(!token){
    return res.status(401).json("Not Authorized !");
}

    const verified = JWT.verify(token, JWT_SECRET);

    if(!verified) {return res.json("Token invalid")};

    next();

}