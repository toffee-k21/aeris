import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const pub = new Redis(redisUrl);
export const sub = new Redis(redisUrl);

pub.on("connect", () => console.log("Redis PUB connected"));
sub.on("connect", () => console.log("Redis SUB connected"));
