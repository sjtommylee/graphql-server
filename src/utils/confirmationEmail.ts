import { Redis } from "ioredis";
import { v4 } from "uuid";
// import { redis } from "../redis";
//http://localhost:4000
// https://my-site.com
// => https://my-site.com/confirm/<id>
/**
 * Best practices:
 * 1. Gather identity data + security questions
 * 2. verify security questions
 * 3. send a token over a side channel
 * 4. allow user to change password in the existing session
 * 5. Logging;
 */

const confirmationEmail = async (url: string, userId: string, redis: Redis) => {
  const id = v4();
  console.log("confirmationemail.ts", id);
  await redis.set(id, userId, "ex", 60 * 60 * 24);
  return `${url}/confirm/${id}`;
};
export default confirmationEmail;
