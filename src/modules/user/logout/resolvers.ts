import { ResolverMap } from "types/graphql-utils";
// import middleware from

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis }) => {
      const { userId } = session;
      if (userId) {
        const sessionIds = await redis.lrange(`SID:${userId}`, 0, -1);
        for (let i = 0; i < sessionIds.length; i += 1) {
          await redis.del(sessionIds[i]);
        }
        return true;
      }
      return false;
    },
  },
};
