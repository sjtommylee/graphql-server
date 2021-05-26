import Redis from "ioredis";
/**
 * Creating a new redis instance.
 *
 * @Redis - Redis is an in-memory data structure store, used as a in-memory key value database.
 *
 * @remarks
 * There are good use cases for Redis:
 * 1. Cache - quick storage of values, ordered sets, and retrieving the data.
 * 2. User login and persisting - sending a unique token as a proof of auth, rather than sending the full list of authorizations
 *
 *  good read @ https://blog.anynines.com/redis-what-is-it-and-when-should-i-use-it/
 *
 */

export const redis = new Redis();
