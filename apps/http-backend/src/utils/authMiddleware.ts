import { JWT_SECRET } from "@repo/common-backend/config";
import { Request, Response, NextFunction } from "express"
import JWT ,{JwtPayload} from "jsonwebtoken"


  interface CustomJwtPayload extends JwtPayload {
    userId: string; 
  }

export const AuthMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Not Authorized!" });
        return; 
      }

    try{
        
            const decoded = JWT.verify(token, JWT_SECRET) as CustomJwtPayload;
        
            // if(!decoded) {return res.json("Token invalid")};
        
            (req as Request & { userId: string }).userId = decoded.userId;
        
            next();

    } catch (e) {
        res.status(403).json({ message: "Token invalid" });
        return;
    }


}