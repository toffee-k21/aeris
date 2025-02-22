import {JWT_SECRET} from "@repo/common-backend/config"
import JWT, {JwtPayload} from "jsonwebtoken"
// console.log(JWT_SECRET);

import { WebSocketServer } from 'ws';

interface CustomJwtPayload extends JwtPayload {
userId : string
}

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

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});