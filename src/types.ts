import WebSocket from "ws";
export type Topic = string;
export type Payload = any;

export interface PublishMessage {
  topic: Topic;
  payload: Payload;
}
export interface ClientSubscriptions {
  [topic: string]: true;
}
export interface WSClient extends WebSocket {
  subscriptions?: Set<Topic>;
  isAlive:any;
}

