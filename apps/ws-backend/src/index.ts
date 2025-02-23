import {JWT_SECRET} from "@repo/common-backend/config"
import JWT, {JwtPayload} from "jsonwebtoken"
import { WebSocketServer } from 'ws';
import WebSocket from 'ws';

interface CustomJwtPayload extends JwtPayload {
userId : string
}

interface User {
  userId: string,
  rooms : string[]
  ws: WebSocket
}

const users:User[] = [];

const wss = new WebSocketServer({ port: 8080 });

function checkUserAuth (token:string):string | null {
  const resp = JWT.verify(token,JWT_SECRET) as CustomJwtPayload;
  if(!resp?.userId){
    return null;
  }
  return resp.userId;
}

wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);

  const url = request.url;
  if(!url){
    return;
  }


  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get('token') || "";
  const userId = checkUserAuth(token);
  if(!userId) {
    ws.close();
    return null;
  }

  users.push({
        userId,
        rooms: [],
        ws
      })

  ws.on('message', function message(data) {
    let parsedData;
    if(typeof data != "string"){
       parsedData = JSON.parse(data.toString());    
    }
    else {
      parsedData = JSON.parse(data);
    }

    if(parsedData.type == "join_room"){
      const user = users.find(x => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }

    if(parsedData.type == "leave_room"){
      const user = users.find(x => x.ws === ws);
      user?.rooms.filter(x => x === parsedData.roomId);
    }

    if(parsedData.type == "chat"){
       users.forEach((user) => {
         if (user.rooms.includes(parsedData.roomId)){
          ws.send(JSON.stringify({
            userId,
            type: "chat",
            message: parsedData.message,
            roomId: parsedData.roomId
          }))
         }
       })
    }

  });
});

/*
msg architecture 
 Chat : {
   type : ,
   message : ,
   roomId: ,
   userId:
 }
*/