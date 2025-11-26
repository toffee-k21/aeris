import Redis from "ioredis";

export function createRedisClients() {
  const redisUrl = process.env.REDIS_URL || "redis://redis:6379";
  const pub = new Redis(redisUrl);
  const sub = new Redis(redisUrl);
  return { pub, sub };
}

