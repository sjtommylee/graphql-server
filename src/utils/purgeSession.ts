import { Redis } from "ioredis";
import { userPrefix, redisPrefix } from "../constants";

// purge the session, clear all user sessions from redis cache
export const purgeSession = async (userId: string, redis: Redis) => {
  const sessionIds = await redis.lrange(`${userPrefix}${userId}`, 0, -1);
  const promises = [];
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redis.del(`${redisPrefix}${sessionIds[i]}`));
  }

  await Promise.all(promises);
};
