import { v4 as uuid } from "uuid";
import { Redis } from "ioredis";

export const forgotPassword = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = uuid();
  await redis.set(`forgot password: ${id}`, userId, "ex", 60 * 60 * 24);
  return `${url}/change-password/${id}`;
};
