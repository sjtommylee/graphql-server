import { ResolverMap } from "types/graphql-utils";
// import middleware from
/**
 * @logout - first grabbing the session id's, based off the current user.
 * sessions represent logging on
 * upon logout, we purge / delete the reddit cache.
 */
export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis }) => {
      const { userId } = session;
      if (userId) {
        const sessionIds = await redis.lrange(`SID:${userId}`, 0, -1);

        //parallel - we are pushing the cache into an empty array called promises.
        // deleting after all of the promises are pushed.
        const promises = [];

        for (let i = 0; i < sessionIds.length; i += 1) {
          promises.push(redis.del(sessionIds[i]));
        }
        await Promise.all(promises);
        return true;
      }
      return false;
    },
  },
};
